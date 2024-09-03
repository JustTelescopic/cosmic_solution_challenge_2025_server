// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPost } from './controllers/fileuploader.js';
import upload from './middleware/multer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/api/upload',upload.single('file'), createPost);




// Error handling middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
