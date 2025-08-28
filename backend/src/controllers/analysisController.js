import path from "path";
import { fetchFileById } from "../services/fileService.js";
import { proccessFileAnalysisAndSave } from "../services/analysisService.js";

/**
 * POST /analysis
 * Recibe el id del registro en DB
 */
export const analyzeFile = async (req, res) => {
  try {
    const { dbFileId } = req.body;

    if (!dbFileId) {
      return res.status(400).json({ error: "Se requiere dbFileId" });
    }

    // Buscar archivo en BD
    const fileRecord = await fetchFileById(dbFileId);
    
    if (!fileRecord) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    
    // Construir ruta absoluta desde la relativa guardada en BD
    const absolutePath = path.join(process.cwd(), "src",fileRecord.file_url);

    // Procesar con IA
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