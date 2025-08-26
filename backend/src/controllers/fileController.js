const { processUploadFile } = require("../services/fileService");

const uploadFile = (req, res) => {
    try {
        const { coderName, trainingName } = req.body;
        const file = req.file;

        const result = processUploadFile(coderName, trainingName, file);

        res.status(200).json({
            message: "Archivo recibido con exito",
            data: result
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { uploadFile };