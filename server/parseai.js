import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

// Setup multer for file uploads
const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

export function setupScanReceiptRoute(app) {
    app.post('/scan_receipt', upload.single('image'), async(req,res) => {
        try{
            // Initialize Anthropic client here, after dotenv has loaded
            const apiKey = process.env.CLAUDE_API_KEY;
            
            const anthropic = new Anthropic({
                apiKey: apiKey
            });

            let imageData;
            let mediaType = 'image/png'; // default
            
            // Get image from uploaded file or base64 body
            if (req.file) {
                // Convert uploaded file to base64
                imageData = req.file.buffer.toString('base64');
                // Use the actual mimetype from the uploaded file
                mediaType = req.file.mimetype;
            } else if (req.body.image) {
                // Use base64 from request body
                imageData = req.body.image;
                // If imageType is provided in the request, use it (priority)
                if (req.body.imageType && req.body.imageType.startsWith('image/')) {
                    mediaType = req.body.imageType;
                } else {
                    // Try to detect image type from base64 header
                    const detectedType = detectImageType(imageData);
                    if (detectedType) {
                        mediaType = detectedType;
                    }
                }
            } else {
                return res.status(400).json({ error: 'Image data is required (upload file or send base64)' });
            }

            console.log('Using media type:', mediaType);

            const msg = await anthropic.messages.create({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 8196,
                messages: [{
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: mediaType,
                                data: imageData
                            }
                        },
                        {
                            type: 'text',
                            text: 'Analyze this receipt and return ONLY valid JSON (no markdown, no code blocks) in this exact format: {"store":"name","date":"YYYY-MM-DD","items":[{"item":"name","price":0.00,"quantity":1}],"warranty":"info","return_policy":"info"} Search the web for the warranty and return policy info for that specific store thats on the receipt specifically for each item except food.'
                        }
                    ]
                }]
            });
            
            let restext = msg.content[0].text;
            
            // Remove markdown code blocks if present
            restext = restext.replace(/^```json\n?/, '').replace(/\n?```$/, '');
            restext = restext.replace(/^```\n?/, '').replace(/\n?```$/, '');
            restext = restext.trim();
            
            const recdata = JSON.parse(restext);
            res.json(recdata);
            
        } catch(error){
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to process receipt', details: error.message });
        }
    });
}

// Helper function to detect image type from base64 header
function detectImageType(base64String) {
    try {
        // Decode the first few bytes of base64 to check file signature
        const binaryString = Buffer.from(base64String.substring(0, 24), 'base64').toString('binary');
        const bytes = [];
        for (let i = 0; i < Math.min(binaryString.length, 12); i++) {
            bytes.push(binaryString.charCodeAt(i));
        }
        
        // PNG signature: 137 80 78 71
        if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) {
            return 'image/png';
        }
        // JPEG signature: 255 216 255
        if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) {
            return 'image/jpeg';
        }
        // WebP signature: RIFF...WEBP
        if (bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 &&
            bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) {
            return 'image/webp';
        }
        // GIF signature: 71 73 70 (GIF)
        if (bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70) {
            return 'image/gif';
        }
    } catch (e) {
        console.error('Error detecting image type:', e.message);
    }
    
    return null;
}