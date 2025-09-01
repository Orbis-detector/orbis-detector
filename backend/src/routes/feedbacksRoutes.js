import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Saves or updates feedback for a given analysis ID
router.post("/:analysisId", async (req, res) => {
  const { analysisId } = req.params;
  const { comment } = req.body;

  try {
    // Check if feedback already exists for this analysis
    const [existing] = await db.query(
      "SELECT feedback_id FROM Feedbacks WHERE analysis_id = ?",
      [analysisId]
    );

    if (existing.length > 0) {
      // Update existing feedback
      await db.query(
        "UPDATE Feedbacks SET comment = ? WHERE analysis_id = ?",
        [comment, analysisId]
      );
      return res.json({ message: "Feedback updated" });
    } else {
      // Insert new feedback
      await db.query(
        "INSERT INTO Feedbacks (analysis_id, comment) VALUES (?, ?)",
        [analysisId, comment]
      );
      return res.json({ message: "Feedback saved" });
    }
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ error: "Error saving feedback" });
  }
});

export default router;
