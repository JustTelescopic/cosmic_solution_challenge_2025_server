// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPost } from './controllers/fileuploader.js';
import upload from './middleware/multer.js';
import { GeminiCattle, GeminiFruits } from './api/gemini.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database

async function handleImageProcessing(req, res, processingFunction) {
  try {
    // const { base64data, inputText } = req.body;
    const { inputText } = req.body;
    const imagePath = req.file.path;
    // if (!base64data) {
    //   return res.status(400).send("No base64 data provided.");
    // }

    // const imageBuffer = Buffer.from(
    //   base64data.split(";base64,").pop(),
    //   "base64"
    // );
    // const imagePath = path.join(uploadsDir, `image_${Date.now()}.jpg`);
    // fs.writeFileSync(imagePath, imageBuffer);

    // console.log("Image saved!");
    console.log({inputText,imagePath})
    const result = await processingFunction(inputText, imagePath);

    res.status(200).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing the image.");
  }
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/api/upload',upload.single('file'), createPost);
app.post("/cattle",upload.single('file'), (req, res) => {
  // const localFilePath = req.file.path;
  // console.log(JSON.stringify(req.file))
  // const {inputText} = req.body
  // console.log(JSON.stringify(req.body))
  // console.log('fiepath : ',localFilePath)
  // console.log('input Text: ',inputText)
  // res.send('hi there')
  // handleImageProcessing(req, res,localFilePath, GeminiCattle);
  handleImageProcessing(req, res, GeminiCattle);

});

app.post("/fruits", (req, res) => {
  handleImageProcessing(req, res, GeminiFruits);
});



// Error handling middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
