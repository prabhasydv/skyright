// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = "uploads/boarding-pass";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, uploadDir),
//   filename: (_, file, cb) => {
//     const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, unique + path.extname(file.originalname));
//   },
// });

// export const uploadBoardingPass = multer({
//   storage,
//   limits: { fileSize: 20 * 1024 * 1024 },
// });


import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve(process.cwd(), "uploads/boarding-pass");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${ext}`);
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const uploadBoardingPass = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB per file
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          `Invalid file type: ${file.mimetype}`
        )
      );
    }
    cb(null, true);
  },
});

    
    