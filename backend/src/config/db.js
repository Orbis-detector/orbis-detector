import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST || 'localhost',
        //puede estallar por el mismo puerto cuidado!
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'defaultdb',
        ssl: process.env.DB_SSL_MODE === 'REQUIRED' ? { rejectUnauthorized: true } : undefined,

        //configuracion del pool
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    }
);

//export principal
export default pool;

//Debugging
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error conectando a MySQL:', error);
    return false;
  }
};