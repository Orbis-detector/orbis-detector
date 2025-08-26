const express = require("express");
const app = express();
const fileRoutes = require("./routes/fileRoutes");

// Middlewares para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijo de las rutas de archivos
app.use("/api/files", fileRoutes);

// Levantar servidor
const PORT = 3000;





// Levantar el servidor
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error al iniciar el servidor:", error);
    }

    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})