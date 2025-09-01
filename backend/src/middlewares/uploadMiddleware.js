// Libraries for handling file uploads and paths
import multer from "multer";
import path from "path";

// Absolute path to the uploads folder
const uploadPath = path.join(process.cwd(), "src", "uploads");

// Multer configuration for saving files to disk
const storage = multer.diskStorage({
  // Destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  // Define final filename for each uploaded file
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Preserve original file extension
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer middleware ready to use in routes (e.g., upload.single("file"))
const upload = multer({ storage });

export default upload;
