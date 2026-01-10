// cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
console.log("DEBUG CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_api',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, 
  } as any,
});

export const uploadCloudinary = multer({ storage: storage });