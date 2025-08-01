const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "edgenius/lessons",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const uploadVideo = multer({ storage: videoStorage });

module.exports = uploadVideo;
