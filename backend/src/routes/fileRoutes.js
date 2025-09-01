import express from "express";
import upload from "../middlewares/uploadMiddleware.js"; 
import { uploadFile, getFile } from "../controllers/fileController.js";

const router = express.Router();

// POST /api/files/upload route: handles file uploads using multer, then calls controller
router.post("/upload", upload.single("file"), uploadFile);

// GET /api/files/:id route: retrieves a file by its ID
router.get("/:id", getFile);

export default router;
