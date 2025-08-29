// Librerías
import multer from "multer";
import path from "path";

// Ruta absoluta a la carpeta uploads
const uploadPath = path.join(process.cwd(), "src", "uploads");

// Configuración de Multer para guardar archivos en disco
const storage = multer.diskStorage({
  // Carpeta destino donde se guardarán los archivos subidos
  destination: (req, file, cb) => {
    // cb = callback que usa Multer para definir dónde guardar
    cb(null, uploadPath);
  },

  // Definir el nombre final con el que se guardará cada archivo
  filename: (req, file, cb) => {
    // uniqueSuffix = marca de tiempo + número aleatorio
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // El archivo conserva su extensión original (ej: .pdf, .jpg, etc.)
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Middleware de Multer listo para usarse en rutas
// (ejemplo: upload.single("file"))
const upload = multer({ storage });

export default upload;