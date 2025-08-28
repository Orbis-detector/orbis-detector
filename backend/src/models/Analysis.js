import pool from '../config/db.js'

//insertar analisis
 export const createAnalysis = async(fileId, iaPercentage, iaDetected, explanation) =>{
     const [result] = await pool.query(
         `INSERT INTO Analysis(submission_id, ia_percentage, ia_detected, explanation)
         VALUES (?, ?, ?, ?)`,
         [fileId, iaPercentage, iaDetected, explanation]
     );
     return result.insertId; // ID del nuevo analisis
 }

// (mock temporal)
// export const createAnalysis = async (fileId, iaPercentage, iaDetected, explanation) => {
//   console.log("Guardando análisis en DB simulada...");
//   console.log({
//     fileId,
//     iaPercentage,
//     iaDetected,
//     explanation
//   });
//   return Math.floor(Math.random() * 1000); // simula un ID autoincremental
// };


export const getAnalysisByFileId = async (fileId) => {
    const [rows] = await pool.query(
        `
        SELECT * FROM Analysis WHERE submission_id = ?
        `,
        [fileId]
    );
    return rows;
}