import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    const response=await cloudinary.uploader.upload(filePath, {
      public_id: "shoes",
    });

    fs.unlinkSync(filePath);
    return response
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

