import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Guardar o actualizar feedback
router.post("/:analysisId", async (req, res) => {
  const { analysisId } = req.params;
  const { comment } = req.body;

  try {
    // Verificar si ya existe feedback para este análisis
    const [existing] = await db.query(
      "SELECT feedback_id FROM Feedbacks WHERE analysis_id = ?",
      [analysisId]
    );

    if (existing.length > 0) {
      // Actualizar
      await db.query(
        "UPDATE Feedbacks SET comment = ? WHERE analysis_id = ?",
        [comment, analysisId]
      );
      return res.json({ message: "Feedback actualizado" });
    } else {
      // Insertar
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

export default router;
