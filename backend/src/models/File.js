import pool from '../config/db.js';

// Inserts a new file record into the Submissions table and returns its ID
export const createFile = async (nameCoder, nameTraining, fileUrl) => {
  const [result] = await pool.query(
    `INSERT INTO Submissions (name_coder, name_training, file_url) 
    VALUES (?, ?, ?)`,
    [nameCoder, nameTraining, fileUrl]
  );
  return result.insertId;
};

// Retrieves a file record by its ID, returns null if not found
export const getFileById = async (fileId) => {
  const [rows] = await pool.query(
    `SELECT * FROM Submissions WHERE submission_id = ?`,
    [fileId]
  );
  return rows[0] || null;
};
