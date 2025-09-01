import fs from 'fs';
import OpenAI from 'openai';
import path from 'path';
import dotenv from 'dotenv';
import {ANALYSIS_PROMPT} from '../config/analysisPrompts.js'
import { createAnalysis } from '../models/Analysis.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Uploads a local file to OpenAI and returns the file ID
export const uploadFileToOpenAI = async (filePath) => {

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at path: ${filePath}`);
  }

  const fileStream = fs.createReadStream(path.resolve(filePath)); // resolve to absolute path and create data stream

  const file = await openai.files.create({
    file: fileStream,
    purpose: "user_data",
  });

  return file.id;
};

// Sends the uploaded file to GPT-5 model for analysis and returns parsed JSON
export const analyseFileWithGPT = async (fileId) => {
    try {
        const response = await openai.responses.create({
            model: "gpt-5",
            input: [
                {
                    role: "user", 
                    content: [
                        { 
                            type: "input_file",
                            file_id: fileId 
                        },
                        {
                            type: "input_text",
                            text: ANALYSIS_PROMPT
                        }
                    ]
                }
            ]
        });

        let parsed;

        try {
            parsed = JSON.parse(response.output_text);
        } catch (parseErr) {
        throw new Error("AI did not return valid JSON");
        }

        return parsed;
    }
    catch (err) {
        console.error("Error analyzing file with GPT:", err);
        throw err;
    }
};

// Full pipeline: uploads file to OpenAI, analyzes it with GPT, and saves the result to the database
export const proccessFileAnalysisAndSave = async (filePath, dbFileId) => {
    try {
        const fileIdOpenAI = await uploadFileToOpenAI(filePath);
        const analysis = await analyseFileWithGPT(fileIdOpenAI);

        const analysisId = await createAnalysis(
            dbFileId,
            analysis.ia_percentage,
            analysis.ia_detected,
            analysis.explanation
        );

        return {
            analysis_id : analysisId,
            file_id : dbFileId,
            ...analysis
        };
    } catch (err) {
        console.error("Error processing file analysis:", err);
        throw err;
    }
}
