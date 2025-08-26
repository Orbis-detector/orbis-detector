// Librerias
const multer = require("multer");
const path = require("path");

// Configuración de Multer (Para guardar archivos en el disco)
const storage = multer.diskStorage({
    // Carpeta destino donde ser guardan los archivos
    destination:(req, file, cb) => { // cb es una función Callback que Multer usa
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Middleware listo para usar en las rutas
const upload = multer({ storage });

module.exports = upload;