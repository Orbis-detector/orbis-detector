import { processUploadFile, fetchFileById } from "../services/fileService.js";
import eventBus, { EVENTS } from '../events.js'

// Handles file upload, processes it, emits FILE_UPLOADED event, and returns response
export const uploadFile = async (req, res) => {
  try {
    const { coderName, trainingName } = req.body;

    const result = await processUploadFile(coderName, trainingName, req.file);

    console.log("Objeto emitido en evento FILE_UPLOADED:", result);
    eventBus.emit(EVENTS.FILE_UPLOADED, result);

    return res.status(201).json({
      message: "Archivo recibido con éxito",
      data: result,
    });
  } catch (error) {
    console.error("Error en uploadFile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Fetches a file by its ID and returns it in the response
export const getFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await fetchFileById(id);

    return res.status(200).json({
      message: "Archivo encontrado",
      data: file,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
