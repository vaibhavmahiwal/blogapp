import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ✅ Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define uploads directory
const uploadsDir = path.join(__dirname, "..", "uploads");

// ✅ Create folder if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);
    cb(null, `${uniqueName}${ext}`);
  },
});

function imageFileFilter(
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (/^image\//.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image uploads are allowed!"));
  }
}

export const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
