import pool from '../config/db.js';

// Insertar archivo
export const createFile = async (nameCoder, nameTraining, fileUrl) => {
  const [result] = await pool.query(
    `INSERT INTO Submissions (name_coder, name_training, file_url) 
     VALUES (?, ?, ?)`,
    [nameCoder, nameTraining, fileUrl]
  );
  return result.insertId;
};

// Buscar archivo por ID
export const getFileById = async (fileId) => {
  const [rows] = await pool.query(
    `SELECT * FROM Submissions WHERE submission_id = ?`,
    [fileId]
  );
  return rows[0] || null;
};