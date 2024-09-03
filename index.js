import express from "express";
import { GeminiCattle, GeminiFruits } from "./api/gemini.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json({ limit: "50mb" }));
async function handleImageProcessing(req, res, processingFunction) {
  try {
    const { base64data, inputText } = req.body;

    if (!base64data) {
      return res.status(400).send("No base64 data provided.");
    }

    const imageBuffer = Buffer.from(
      base64data.split(";base64,").pop(),
      "base64"
    );
    const imagePath = path.join(uploadsDir, `image_${Date.now()}.jpg`);
    fs.writeFileSync(imagePath, imageBuffer);

    console.log("Image saved!");

    const result = await processingFunction(inputText, imagePath);

    res.status(200).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing the image.");
  }
}

app.post("/cattle", (req, res) => {
  handleImageProcessing(req, res, GeminiCattle);
});

app.post("/fruits", (req, res) => {
  handleImageProcessing(req, res, GeminiFruits);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
