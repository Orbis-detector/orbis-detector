import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import { testConnection } from "./config/db.js";

const app = express();

// Probar conexión a la base de datos al iniciar
testConnection();

// Middlewares para procesar JSON y formularios
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijo de las rutas de archivos
app.use("/api/files", fileRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Levantar el servidor
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error al iniciar el servidor:", error);
  } else {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  }
});