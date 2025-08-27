import { proccessFileAnalysisAndSave } from './src/services/analysisService.js';

// ⚠️ Cambia estas rutas/IDs a algo real de tu DB
const filePath = './src/uploads/relato_elara.pdf';   // Archivo que quieras analizar
const dbFileId = 1;                         // ID que exista en tu tabla Files

(async () => {
  try {
    const result = await proccessFileAnalysisAndSave(filePath, dbFileId);
    console.log("Resultado del análisis:", result);
  } catch (err) {
    console.error("Error en la prueba:", err);
  }
})();
