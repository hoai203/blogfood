const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "React_Blogger",
    allowed_formats: ["jpg", "png"],
    transformation: [
      { width: 1200, height: 800, crop: 'fill' }, // Kích thước sau khi cắt
      { quality: 'auto' } // Giảm chất lượng tự động
    ]
  }
});

const uploadCloud = multer({ storage });
module.exports = uploadCloud;
