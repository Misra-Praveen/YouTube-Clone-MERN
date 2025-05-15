const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/authMiddleware.js");
const { uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  dislikeVideo,
  deleteVideo, } = require("../controllers/videoController.js");

// Configure multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });


// Route to get all videos
router.get("/videos", getAllVideos);

router.get("/:id", getVideoById);
router.put("/:id/like", verifyToken, likeVideo);
router.put("/:id/dislike", verifyToken, dislikeVideo);
router.delete("/:id", verifyToken, deleteVideo);

// Route to upload a video
router.post("/upload", verifyToken, upload.single("thumbnail"), uploadVideo);

module.exports = router;
