import { File as NodeFile } from 'node:buffer';
if (!globalThis.File) {
  globalThis.File = NodeFile;
}
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import db from "./src/config/db.js";
import { testConnection } from "./src/config/db.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import analysisRoutes from "./src/routes/analysisRoutes.js";
import eventBus, {EVENTS} from "./src/events.js";
import {proccessFileAnalysisAndSave } from "./src/services/analysisService.js";
import feedbacksRoutes from "./src/routes/feedbacksRoutes.js";


dotenv.config();

const app = express();
// Test database connection on startup
testConnection();

// Basic CORS configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/analysis", analysisRoutes);
// Prefix for file routes
app.use("/api/files", fileRoutes);
// Serve the "uploads" folder as static
// Any file in /uploads will be accessible from http://localhost:3002/uploads/<filename>
app.use("uploads", express.static(path.join(process.cwd(), "uploads")));
// Feedbacks
app.use("/api/feedbacks", feedbacksRoutes);

// Event control executed after a file is successfully uploaded
eventBus.on(EVENTS.FILE_UPLOADED, async (file) => {
  try {
    console.log("Objeto recibido en listener:", file);
    const absolutePath = path.join(process.cwd(), "src", file.file_path);
    await proccessFileAnalysisAndSave(absolutePath, file.file_id);
    console.log(`Análisis ejecutado para archivo ${file.file_id}`);
  } catch (error) {
    console.error("Error en análisis automático:", error);
  }
});

// app.use(express.static(path.join(process.cwd(), "frontend")));

/* Endpoints that consume the database */

// Get all analyses for the table
app.get("/getAnalysis", async (req, res) => {
  try { 
    const query = `
      SELECT s.submission_id, s.name_coder, s.name_training, a.ia_detected
      FROM Submissions s
      INNER JOIN Analysis a 
          ON s.submission_id = a.submission_id;
    `;

    const [rows] = await db.query(query);

    res.json(rows);
  } catch (err) {
    console.error("Error en DB:", err);
    res.status(500).json({ error: "Error en DB" });
  }
});

// Get all data for a specific analysis for the popup
app.get("/getAnalysis/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT 
        a.analysis_id, 
        a.submission_id, 
        a.ia_percentage, 
        a.ia_detected, 
        a.explanation,
        f.feedback_id, 
        f.comment
    FROM Analysis a
    LEFT JOIN Feedbacks f ON a.analysis_id = f.analysis_id
    WHERE a.analysis_id = ?;
    `;

    const [rows] = await db.query(query, [id]);

    res.json(rows);
  } catch (err) {
    console.error("Error en DB:", err);
    res.status(500).json({ error: "Error en DB" });
  }
});

// Save or update feedback
app.post("/feedback/:analysisId", async (req, res) => {
  const { analysisId } = req.params;
  const { comment } = req.body;

  try {
  // Check if feedback already exists for this analysis
    const [existing] = await db.query(
      "SELECT feedback_id FROM Feedbacks WHERE analysis_id = ?",
      [analysisId]
    );

    if (existing.length > 0) {
  // Update
      await db.query(
        "UPDATE Feedbacks SET comment = ? WHERE analysis_id = ?",
        [comment, analysisId]
      );
      return res.json({ message: "Feedback actualizado" });
    } else {
  // Insert
      await db.query(
        "INSERT INTO Feedbacks (analysis_id, comment) VALUES (?, ?)",
        [analysisId, comment]
      );
      return res.json({ message: "Feedback guardado" });
    }
  } catch (err) {
    console.error("Error guardando feedback:", err);
    res.status(500).json({ error: "Error guardando feedback" });
  }
});

// Serve static frontend files
const frontendPath = path.join(process.cwd(), '..', 'frontend');
app.use(express.static(frontendPath));

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Port and server start
const PORT = process.env.PORT || 3002;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error al iniciar el servidor:", error);
  } else {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
    console.log(`Frontend disponible en: http://localhost:${PORT}`);
  }
});