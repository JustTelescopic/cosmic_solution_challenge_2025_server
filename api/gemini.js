import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export async function Gemini(textInput, imagePath, instructions) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBqv7SOSbm05gZTACMwQkqjmUBlrkJg74Q"
  );
  const fileManager = new GoogleAIFileManager(
    "AIzaSyBqv7SOSbm05gZTACMwQkqjmUBlrkJg74Q"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      candidateCount: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      temperature: 1.0,
      responseMimeType: "application/json",
    },
    systemInstruction: `
      Create a structured AI-generated report for diagnosing plant diseases related to fruit leaves. 
      The report should be clear, concise, and visually appealing, formatted for mobile viewing. 
      The report should include the following sections:

      Disease Recognized:

      Severity: Indicate the level of severity (e.g., Low, Medium, High).

      Description: Provide a brief overview of the disease, including the pathogen causing it, 
      the plants it affects, and the potential damage or yield loss it can cause if not treated properly.

      Treatment Plan:
      Give 3 main important treatment plans with a description in 1-2 lines.

      Preventive Measures:
      Give 2 main important preventive measures with a description in 1-2 lines.

      Actionable insights:
      Give 4 pointer words (1,2,3,4) no description only important words as actionable steps.

      Additional Notes:
      Provide a short note on the importance of monitoring weather conditions, 
      as certain weather patterns can increase disease risk. Emphasize the need for regular 
      plant inspections and immediate action when symptoms are detected. Highlight the importance 
      of proper storage of harvested crops to prevent the spread of diseases. (only 2-3 lines no pointer/points)

      Knowledge Base for your understanding you can refer from here:
      https://www.sciencedirect.com/science/article/pii/S2352340924006802
      https://spj.science.org/doi/full/10.34133/plantphenomics.0174
      https://www.mdpi.com/2073-4395/14/7/1589
      https://ipm.ucanr.edu/PMG/diseases/diseases.fruits.html
      https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9470709/
      https://www.kau.in/sites/default/files/documents/diseases_of_passion_fruit.pdf
    `,
  });

  try {
    // Directly use the imagePath provided
    const uploadResult = await fileManager.uploadFile(imagePath, {
      mimeType: "image/jpeg", // You can customize the MIME type if needed
      displayName: "Uploaded image",
    });

    console.log(
      `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
    );

    const result = await model.generateContent([
      textInput,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    console.log(result.response.text());
    return result;
  } catch (error) {
    console.error("Error during image processing or upload:", error);
    throw error;
  }
}
