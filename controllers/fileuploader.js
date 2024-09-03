import fs from 'fs';
import { Gemini } from '../api/gemini.js';

export const createPost = async (req, res) => {  
  const localFilePath = req.file.path;
  console.log({ localFilePath });
  try{   
    // Respond immediately with the file path
    
    // fs.unlink(localFilePath, (err) => {
    //   if (err) {
    //     console.error(`Failed to delete file ${localFilePath}: ${err.message}`);
    //   } else {
    //     console.log(`File ${localFilePath} deleted successfully`);
    //   }
    // // Set a delay (e.g., 5 seconds) before deleting the file
    // });
    // Call the Gemini function with the saved image path
    const result = await Gemini(
      "Tell me about this disease",
        localFilePath
    );

    res.status(200).send(result);
    // res.status(201).json({ filePath: localFilePath });

  }catch(err){
    res.status(400).json({ message: err.message });
  }
};
