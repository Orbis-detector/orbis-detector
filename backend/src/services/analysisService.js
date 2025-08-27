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

export const uploadFileToOpenAI = async (filePath) => {

  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado en ruta: ${filePath}`);
  }

  const fileStream = fs.createReadStream(path.resolve(filePath)); // lo resuelve a una ruta absoluta y luego crea el stream o flujo de datos

  const file = await openai.files.create({
    file: fileStream,
    purpose: "user_data",
  });

  return file.id;
};

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
        throw new Error("La IA no devolvió JSON válido");
        }

        return parsed;
    }
    catch (err) {
        console.error("Error al analizar el archivo con GPT:", err);
        throw err;
    }
};

export const proccessFileAnalysisAndSave = async (filePath, dbFileId) => {
    try {
        // Logica
        const fileIdOpenAI = await uploadFileToOpenAI(filePath);
        const analysis = await analyseFileWithGPT(fileIdOpenAI);

        //  Guardar
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
        console.error("Error al procesar el análisis del archivo:", err);
        throw err;
    }
}