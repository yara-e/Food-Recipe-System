import multer from "multer";


const storage = multer.diskStorage({
  destination: "uploads/recipes",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."),
      false,
    );
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).array("image", 5);

export const upload = (req, res, next) => {
  multerUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large. Max is 2MB." });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    next();
  });
};
