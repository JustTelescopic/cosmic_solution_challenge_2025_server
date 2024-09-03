import express from "express";
import { Gemini } from "./api/gemini.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' })); // Limit increased to handle large base64 data

app.post("/api/v2/upload", async (req, res) => {
  try {
    const { base64data } = req.body;

    if (!base64data) {
      return res.status(400).send("No base64 data provided.");
    }

    // Extract and convert the Base64 string to a binary image file
    const imageBuffer = Buffer.from(base64data.split(";base64,").pop(), "base64");
    const imagePath = path.join(__dirname, "image.jpg");

    // Save the image file
    fs.writeFileSync(imagePath, imageBuffer);

    console.log("Image saved!");

    // Call the Gemini function with the saved image path
    const result = await Gemini(
      "Tell me about this disease",
      imagePath
    );

    res.status(200).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing the image.");
  }
});

app.use('/',(req,res)=>{
  res.send('<h1>hello world</h1>')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
