import fs from 'fs';
import path from "path";
import { fetchFileById } from "../services/fileService.js";
import { proccessFileAnalysisAndSave } from "../services/analysisService.js";

// Handles POST /analysis: validates input, fetches file, checks path, 
// processes AI analysis, and returns results
export const analyzeFile = async (req, res) => {
  try {
    const { dbFileId } = req.body;

    if (!dbFileId) {
      return res.status(400).json({ error: "Se requiere dbFileId" });
    }

    // Fetch file from DB by ID and return 404 if not found
    const fileRecord = await fetchFileById(dbFileId);
    if (!fileRecord) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    
    // Build absolute path from DB-stored relative path and check file existence
    const absolutePath = path.join(process.cwd(), "src", file.file_path);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: "El archivo no está disponible en la carpeta" });
    }

    // Process with AI
    const aiResult = await proccessFileAnalysisAndSave(absolutePath, dbFileId);

    return res.status(201).json({
      success: true,
      analysis_id: aiResult.analysis_id,
      result: aiResult,
      file: fileRecord
    });

  } catch (error) {
    console.error(" Error en analyzeFile:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};