import { processUploadFile, fetchFileById } from "../services/fileService.js";

//Controlador para subir un archivo.
//Recibe req.file (multer) + campos en req.body y delega al service.
export const uploadFile = async (req, res) => {
  try {
    const { coderName, trainingName } = req.body; // datos del formulario
    const file = req.file; // archivo procesado por multer

    // Llamada al service que valida, guarda en DB y devuelve info del archivo
    const result = await processUploadFile(coderName, trainingName, file);

    // Responder con éxito (201 = creado)
    return res.status(201).json({
        message: "Archivo recibido con éxito",
        data: result,
        download_url: `/uploads/${result.original_name}`, // o el filename único
        data: result
    });
  } catch (error) {
    // Error de validación / DB / etc.
    return res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener un archivo por su ID (params.id).
export const getFile = async (req, res) => {
  try {
    const { id } = req.params; // id viene en la URL

    // Buscar en DB vía service
    const file = await fetchFileById(id);

    // Responder con el registro encontrado
    return res.status(200).json({
      message: "Archivo encontrado",
      data: file,
    });
  } catch (error) {
    // Si no existe o falló la búsqueda
    return res.status(404).json({ message: error.message });
  }
};