import { Router } from "express";
import { analyzeFile } from "../controllers/analysisController.js";

const router = Router();

// POST /analysis
router.post("/", analyzeFile);

export default router;