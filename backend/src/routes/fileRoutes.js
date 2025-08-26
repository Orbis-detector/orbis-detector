const expresss = require("express");
const router = expresss.Router();
const upload = require("../middlewares/uploadMiddleware"); // middleware multer
const { uploadFile } = require("../controllers/fileController");

// Ruta POST /api/files/upload
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;