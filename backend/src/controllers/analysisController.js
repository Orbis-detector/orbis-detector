import { proccessFileAnalysisAndSave } from "../services/analysisService.js";

/**
 * POST /analysis
 * Recibe la ruta del archivo (local) y el id del registro en DB
 */
export const analyzeFile = async (req, res) => {
  try {
    const { filePath, dbFileId } = req.body;

    if (!filePath || !dbFileId) {
      return res.status(400).json({ error: "Se requiere filePath y dbFileId" });
    }

    const analysisResult = await proccessFileAnalysisAndSave(filePath, dbFileId);

    return res.status(201).json(analysisResult);
  } catch (error) {
    console.error(" Error en analyzeFile:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};