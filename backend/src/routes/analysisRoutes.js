import { Router } from "express";
import { analyzeFile } from "../controllers/analysisController.js";

const router = Router();

// Defines POST /analysis route to handle file analysis requests
router.post("/", analyzeFile);

export default router;
