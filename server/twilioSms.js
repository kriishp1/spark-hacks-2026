import dotenv from 'dotenv';
import supabase from '@supabase/supabase-js';
import twilio from 'twilio';

dotenv.config();

const accountSID = process.env.ACC_SID;
const AuthToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSID, AuthToken);
const supabaseClient = supabase.createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

console.log("Twilio SID:", accountSID ? "Loaded" : "Missing");
console.log("Twilio Auth Token:", AuthToken ? "Loaded" : "Missing");
console.log("Twilio Number:", twilioNumber ? "Loaded" : "Missing");

let sentNotifications = new Set();

async function checkExpiringReceipts() {
    try {
        // Get all user settings with phone numbers
        const { data: userSettings, error: settingsError } = await supabaseClient
            .from('user_settings')
            .select('user_id, phone_number, notification_frequency');

        if (settingsError) {
            console.error('Error fetching user settings:', settingsError);
            return;
        }

        console.log(`Found ${userSettings?.length || 0} users with settings`);

        // For each user, check for expiring receipts
        for (const setting of (userSettings || [])) {
            if (!setting.phone_number || setting.notification_frequency === 'never') {
                continue;
            }

            const daysUntilNotify = parseInt(setting.notification_frequency) || 7;
            const today = new Date();
            const notificationDate = new Date();
            notificationDate.setDate(today.getDate() + daysUntilNotify);

            const todayStr = today.toISOString().split('T')[0];
            const notificationDateStr = notificationDate.toISOString().split('T')[0];

            // Get receipts expiring within the notification window
            const { data: receipts, error: receiptsError } = await supabaseClient
                .from('receipts')
                .select('id, store_name, expires, total_amount')
                .eq('user_id', setting.user_id)
                .gte('expires', todayStr)
                .lte('expires', notificationDateStr)
                .is('notification_sent', null);

            if (receiptsError) {
                console.error('Error fetching receipts:', receiptsError);
                continue;
            }

            console.log(`User ${setting.user_id}: Found ${receipts?.length || 0} expiring receipts`);

            // Send SMS for each expiring receipt
            for (const receipt of (receipts || [])) {
                const notificationKey = `${setting.user_id}-${receipt.id}`;

                if (sentNotifications.has(notificationKey)) {
                    continue;
                }

                try {
                    const message = await client.messages.create({
                        body: `Reminder: Your receipt from ${receipt.store_name} (${receipt.total_amount}) expires on ${receipt.expires}. Log in to manage your receipts!`,
                        from: twilioNumber,
                        to: setting.phone_number
                    });

                    console.log(`SMS sent to ${setting.phone_number} for ${receipt.store_name}`);
                    sentNotifications.add(notificationKey);

                    // Mark notification as sent in database
                    await supabaseClient
                        .from('receipts')
                        .update({ notification_sent: new Date().toISOString() })
                        .eq('id', receipt.id);

                } catch (error) {
                    console.error(`Error sending SMS to ${setting.phone_number}:`, error.message);
                }
            }
        }

    } catch (error) {
        console.error('Error in checkExpiringReceipts:', error);
    }
}

export function setupTwilioRoutes(app) {
    // Manual trigger endpoint
    app.post('/check-expiring-receipts', async (req, res) => {
        try {
            await checkExpiringReceipts();
            res.json({ success: true, message: 'Checked for expiring receipts' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to check receipts' });
        }
    });

    // Test endpoint
    app.post('/send-test-sms', async (req, res) => {
        try {
            const { phone, message } = req.body;
            
            if (!phone || !message) {
                return res.status(400).json({ error: 'Phone and message required' });
            }

            const sms = await client.messages.create({
                body: message,
                from: twilioNumber,
                to: phone
            });

            res.json({ success: true, sid: sms.sid });
        } catch (error) {
            console.error('Error sending test SMS:', error.message);
            res.status(500).json({ error: 'Failed to send SMS' });
        }
    });
}

// Run check every 24 hours
setInterval(checkExpiringReceipts, 24 * 60 * 60 * 1000);

// Also run once on startup
checkExpiringReceipts();
