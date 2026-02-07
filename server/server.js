import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { setupScanReceiptRoute } from "./parseai.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('CLAUDE_API_KEY loaded:', process.env.CLAUDE_API_KEY ? 'Yes' : 'No');


console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: '30mb' }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Setup routes
setupScanReceiptRoute(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

