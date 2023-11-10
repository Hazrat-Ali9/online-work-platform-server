import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
import config from '../config';
import { ICloudinaryResponse, IUploadFile } from '../interfaces/file';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `uploads/`;
    fs.mkdirSync(path, { recursive: true });
    // cb(null, 'uploads/');
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteFromCloudinary = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      (error: Error, result: ICloudinaryResponse) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
  deleteFromCloudinary,
};
