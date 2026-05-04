import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "src/uploads/",  
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");
    if (isImage) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

export const upload = multer({ storage, fileFilter });