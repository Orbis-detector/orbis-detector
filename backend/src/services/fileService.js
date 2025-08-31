import path from "path";
import { createFile, getFileById } from "../models/File.js";

// Processes an uploaded file: validates input, saves relative path in DB, and returns file info
export const processUploadFile = async (coderName, trainingName, file) => {
    if (!file) throw new Error("No file uploaded");
    if (!coderName || !trainingName) {
        throw new Error("coderName and trainingName are required");
    }

    // Store only the relative path in DB (portable across environments)
    const relativePath = path.posix.join("uploads", file.filename);

    // Save file record in Submissions table and get generated ID
    const fileId = await createFile(coderName, trainingName, relativePath);

    // Return relevant file information
    return {
        file_id: fileId,
        coder_name: coderName,
        training_name: trainingName,
        original_name: file.originalname,
        file_path: relativePath,
    };
};

// Retrieves a file from the DB by its ID, throws error if not found
export const fetchFileById = async (fileId) => {
    const file = await getFileById(fileId);

    if (!file) {
        throw new Error(`File with ID ${fileId} not found`);
    }

    return file;
};
