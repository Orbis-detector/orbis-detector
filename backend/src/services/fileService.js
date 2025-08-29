import path from "path";
import { createFile, getFileById } from "../models/File.js";

// Procesa y guarda un archivo en la BD
export const processUploadFile = async (coderName, trainingName, file) => {
    // Validar que exista un archivo
    if (!file) throw new Error("No se subió ningún archivo");
    if (!coderName || !trainingName) {
        throw new Error("coderName y trainingName son requeridos");
    }

    //  Guardar SOLO la ruta relativa en DB (portable entre entornos)
    // Usamos path.posix para asegurar "/" en la URL sin importar SO
    const relativePath = path.posix.join("uploads", file.filename);

    // Guardar en la base de datos (Submissions) y obtener el ID generado
    const fileId = await createFile(coderName, trainingName, relativePath);


    // Retornar un objeto con toda la información relevante
    return {
        file_id: fileId, // ID del archivo en DB
        coder_name: coderName, // Nombre del programador
        training_name: trainingName, // Nombre del entrenamiento
        original_name: file.originalname, // Nombre original del archivo subido
        file_path: relativePath, // Ruta en el servidor relativa
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