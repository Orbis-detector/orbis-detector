import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { testConnection } from "./src/config/db.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import analysisRoutes from "./src/routes/analysisRoutes.js";

dotenv.config();

const app = express();

// Probar conexión a la base de datos al iniciar
testConnection();

// Middleware para que entienda JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/analysis", analysisRoutes);
// Prefijo de las rutas de archivos
app.use("/api/files", fileRoutes);
// Servir la carpeta "uploads" como estática
// Así cualquier archivo en /uploads se podrá acceder desde http://localhost:3002/uploads/<nombre>
app.use("uploads", express.static(path.join(process.cwd(), "uploads")));

// Puerto y levante
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error al iniciar el servidor:", error);
  } else {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  }
});
