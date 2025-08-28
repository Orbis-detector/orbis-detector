import path from "path";
import { createFile, getFileById } from "../models/File.js";

// Procesa y guarda un archivo en la BD
export const processUploadFile = async (coderName, trainingName, file) => {
    // Validar que exista un archivo
    if (!file) {
        throw new Error("No se subió ningún archivo");
    }

    // Construir la ruta completa donde quedó guardado
    const filePath = path.join(file.destination, file.filename);

    // Guardar en la base de datos (Submissions) y obtener el ID generado
    const fileId = await createFile(coderName, trainingName, filePath);

    // Retornar un objeto con toda la información relevante
    return {
        file_id: fileId, // ID del archivo en DB
        coder_name: coderName, // Nombre del programador
        training_name: trainingName, // Nombre del entrenamiento
        original_name: file.originalname, // Nombre original del archivo subido
        file_path: filePath, // Ruta en el servidor
    };
};

// Obtener archivo desde la BD por su ID
export const fetchFileById = async (fileId) => {
    const file = await getFileById(fileId);

    // Si no existe, lanzar error
    if (!file) {
        throw new Error(`Archivo con ID ${fileId} no encontrado`);
    }

    return file;
};