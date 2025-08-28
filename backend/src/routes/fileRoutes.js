import express from "express";
import upload from "../middlewares/uploadMiddleware.js"; 
import { uploadFile, getFile } from "../controllers/fileController.js";

const router = express.Router();

// Ruta POST /api/files/upload que va a subir archivo
// Usa multer (upload.single) para procesar el archivo y luego pasa al controlador
router.post("/upload", upload.single("file"), uploadFile);

// Ruta GET /api/files/:id para obtener archivo por ID
router.get("/:id", getFile);

export default router;