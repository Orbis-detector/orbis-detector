import pool from '../config/db.js'

// Inserts a new AI analysis record into the database and returns its ID
export const createAnalysis = async(fileId, iaPercentage, iaDetected, explanation) =>{
    const [result] = await pool.query(
        `INSERT INTO Analysis(submission_id, ia_percentage, ia_detected, explanation)
        VALUES (?, ?, ?, ?)`,
        [fileId, iaPercentage, iaDetected, explanation]
    );
    return result.insertId;
}

// Fetches all AI analysis records for a given file ID
export const getAnalysisByFileId = async (fileId) => {
    const [rows] = await pool.query(
        `
        SELECT * FROM Analysis WHERE submission_id = ?
        `,
        [fileId]
    );
    return rows;
}
