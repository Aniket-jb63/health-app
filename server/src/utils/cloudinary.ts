import { v2 as cloudinary, UploadStream } from "cloudinary";
import { config } from "../config/index.config";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export const uploadToCloudinary = (fileBuffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "prescriptions" },
      (error, result) => {
        if(error) return reject(error);
        resolve(result);
      }
    )
  });
  streamifier.createReadStream(fileBuffer).pipe(UploadStream);
}