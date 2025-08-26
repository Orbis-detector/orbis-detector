const path = require("path");

const processUploadFile = (coderName, trainingName, file) => {
    // Valida que no falte el archivo
    if (!file) {
        throw new Error("No se subio ningun archivo");
    }

    return {
        coderName,
        trainingName,
        originalName: file.originalname,
        filePath: path.join(file.destination, file.filename),
    };
};

module.exports = { processUploadFile };