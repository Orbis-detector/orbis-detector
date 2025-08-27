const expresss = require("express");
const router = expresss.Router();
const upload = require("../middlewares/uploadMiddleware"); // middleware multer
const { uploadFile } = require("../controllers/fileController");

// Ruta POST /api/files/upload
router.post("/upload", upload.single("file"), (req, res) => {
    const coderName = req.body.coderName;
    const trainingName = req.body.trainingName;
    console.log("Coder:", coderName, "- Training:", trainingName);
  
    if (!req.file) return res.status(400).json({ message: "No se recibió el archivo" });

    res.status(200).json({
        message: "Archivo subido correctamente",
        data: {
            filename: req.file.filename, // nombre guardado en el servidor
            originalName: req.file.originalname, // nombre que subió el usuario
            path: req.file.path, // ruta completa en el servidor
            coderName,
            trainingName
        }
    });
});

module.exports = router;