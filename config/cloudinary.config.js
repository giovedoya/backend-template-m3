// config/cloudinary.config.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "weddsell", // The name of the folder in cloudinary
    allowed_formats: ["jpg", "png"],
    // With this configuration, multer can upload multiple files in the same request
    // Otherwise, it will upload only the first file in the array
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => "computed-filename-using-request-data",
  },
});
const upload = multer({ storage: storage }).array("images", 10); // The maximum number of files you can upload is 10.

module.exports = upload;
module.exports = multer({ storage });
