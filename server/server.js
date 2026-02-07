import express from "express";
import supabase from "./supabaseClient.js"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const QRCode = require('qrcode');

app.use(cors());
app.use(express.json());


// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

//Get the token

let token = null;

const getToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  
  if (error || !data.session) {
    console.error('No active session, server does does not have the auth token.');
    return null;
  }

  token = data.session.access_token;
};

// QR Code endpoint for receipt
app.get("/receipt_insert_qr", (req, res) => {
  
  if (!token) {
    return res.status(400).json({ error: "Token is required." });
  }
  
  const mobileUrl = `${process.env.MOBILE_BASE_URL}/InsertPage?token=${token}`;
  
  QRCode.toDataURL(mobileUrl, (err, url) => {
    if (err) {
      return res.status(500).json({ error: "Failed to generate QR code" });
    }
    res.json({ qrCode: url });
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

