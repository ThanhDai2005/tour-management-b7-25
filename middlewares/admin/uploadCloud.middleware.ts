import { v2 as cloudinary } from "cloudinary";

let streamUpload = (buffer: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET,
        folder: "tour-management-b7-25",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    stream.end(buffer);
  });
};

// upload nhiều file gồm ảnh video tài liệu
export const uploadMulti = async (req: any, res: any, next: any) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const uploads = req.files.map((file: any) => streamUpload(file.buffer));

    const results = await Promise.all(uploads);
    const fieldName = req.files[0].fieldname;

    req.body[fieldName] = results.map((item, index) => item.secure_url);
  } catch (error) {
    console.log(error);
  }

  next();
};
