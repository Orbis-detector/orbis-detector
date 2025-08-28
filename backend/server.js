import express from "express";
import dotenv from "dotenv";
import analysisRoutes from "./src/routes/analysisRoutes.js";

dotenv.config();

const app = express();

// Middleware para que entienda JSON
app.use(express.json());

// Rutas
app.use("/analysis", analysisRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
