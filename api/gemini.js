import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export async function GeminiFruits(textInput, imagePath) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAAA5bDGrVQtU4nxkdsg723lOatEuSBJf0"
  );
  const fileManager = new GoogleAIFileManager(
    "AIzaSyAAA5bDGrVQtU4nxkdsg723lOatEuSBJf0"
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

export async function GeminiCattle(inputText, imagePath) {
  console.log({inputText,imagePath})
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAAA5bDGrVQtU4nxkdsg723lOatEuSBJf0"
  );
  const fileManager = new GoogleAIFileManager(
    "AIzaSyAAA5bDGrVQtU4nxkdsg723lOatEuSBJf0"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      candidateCount: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      temperature: 2.0,
      responseMimeType: "application/json",
    },
    systemInstruction: `
    Create a structured AI-generated report for diagnosing catlle diseases . The report should be clear, concise, and visually appealing, formatted for mobile viewing. The report should include the following sections:

    Disease Recognized:

    Severity: Indicate the level of severity (e.g., Low, Medium, High).
    Description: Provide a brief overview of the disease, including the type of disease (contagious/non-contagious), occuring in which animal, small symptoms overview and the potential damage or yield loss it can cause if not treated properly. (no pointer/points)

    Treatment Plan:
    Give 3 main imp treatment plan with description in 1-2 lines

    Preventive Measures:
    Give 2 main imp preventive measures with description in 1-2 lines

    Actionable insights :
    Give 4 actionable technique stepwise (1 single word for each step) 

    Additional Notes:

    Provide a short note on the importance of early detection / regular checkup add as per your need. Highlight the importance to prevent the spread of diseases. (only 2-3 lines no pointer/points)

    Knowledge Base for your understanding you can refer from here:
    https://www.aphis.usda.gov/livestock-poultry-disease/cattle#:~:text=Trichomoniasis%20is%20a%20disease%20of%20the%20reproductive%20tract%20that%20affects%20cattle%20worldwide.&text=Bovine%20tuberculosis%20is%20a%20rare,goats%2C%20dogs%2C%20and%20people.&text=Vesicular%20stomatitis%20is%20a%20contagious,cattle%20with%20blister%2Dlike%20lesions.

    https://agritech.tnau.ac.in/animal_husbandry/animhus_cattle%20_diseases.html
    https://www.daera-ni.gov.uk/topics/animal-health-and-welfare/animal-diseases/diseases-affect-cattle
    https://agriculture.vic.gov.au/biosecurity/animal-diseases/cattle-diseases
    https://www.mdpi.com/2076-2615/14/12/1836
    https://www.mdpi.com/2076-2615/14/5/816
    https://www.e3s-conferences.org/articles/e3sconf/abs/2024/40/e3sconf_esdca2024_01026/e3sconf_esdca2024_01026.html
    https://www.sciencedirect.com/science/article/pii/S0022030223007336
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
    console.log({inputText})

    const result = await model.generateContent([
      inputText,
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
export async function GeminiVegetables(textInput, imagePath) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAAA5bDGrVQtU4nxkdsg723lOatEuSBJf0"
  );
  const fileManager = new GoogleAIFileManager(
    "AIzaSyAAA5bDGrVQtU4nxkdsg723lOatEuSBJf0"
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      candidateCount: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      temperature: 2.0,
      responseMimeType: "application/json",
    },
    systemInstruction: `
    Create a structured AI-generated report for diagnosing plant diseases.The report should be clear, concise, and visually appealing, formatted for mobile viewing.The report should include the following sections:
    
    Disease Recognized:
    Severity: Indicate the level of severity (e.g., Low, Medium, High).
    
    Description: Provide a brief overview of the disease, including the pathogen causing it, the plants it affects, and the potential damage or yield loss 
    it can cause if not treated properly.
    
    Treatment Plan:
    Give 3 main imp treatment plan with description in 1-2 lines
    
    Preventive Measures:
    Give 2 main imp preventive measures with description in 1-2 lines
    
    Actionable insights :
    Give 4 pointer words (1,2,3,4) no desc only imp words as actionable steps

    Additional Notes:
    Provide a short note on the importance of monitoring weather conditions, as certain weather patterns can increase disease risk. Emphasize the need for regular plant inspections and immediate action when symptoms are detected. Highlight the importance of proper storage of harvested crops to prevent the spread of diseases. (only 2-3 lines no pointer/points)
    
    Knowledge Base for your understanding you can refer from here:
    https://www.mdpi.com/2073-4395/13/7/1700
    https://www.ijetcse.com/admin/uploads/Disease%20Detection%20in%20Vegetables%20Using%20Image%20Processing%20Techniques:%20A%20Review_1605597006.pdf
    https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2024.1356260/full
    https://www.nature.com/articles/s41598-024-54540-9
    https://www.researchgate.net/profile/Pradeep-Jha-10/publication/379574137_Implementation_of_Machine_Learning_Classification_Algorithm_Based_on_Ensemble_Learning_for_Detection_of_Vegetable_Crops_Disease/links/660fc8c7390c214cfd362018/Implementation-of-Machine-Learning-Classification-Algorithm-Based-on-Ensemble-Learning-for-Detection-of-Vegetable-Crops-Disease.pdf
    https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10458943
    https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2024.1355941/full
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
