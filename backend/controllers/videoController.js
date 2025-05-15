const { Video, Comment } = require("../models/videoModel");
const Channel = require("../models/channelModel");

// Upload a new video
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, channelId, category } = req.body;

    if (!title || !description || !channelId || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newVideo = new Video({
      title,
      description,
      channelId,
      uploader: req.user.id,
      thumbnailUrl,
      category,
    });

    await newVideo.save();

    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: newVideo._id },
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .populate("uploader", "username avatar")
      .populate("channelId", "channelName");

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a video by ID with populated fields
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("uploader", "username avatar")
      .populate("channelId", "channelName")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "username avatar" },
      });

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a video
exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user.id;

    if (!video) return res.status(404).json({ message: "Video not found" });

    // Remove user from dislikes if present
    video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);

    // Add to likes if not already liked
    if (!video.likes.some((id) => id.toString() === userId)) {
      video.likes.push(userId);
    }

    await video.save();
    res.status(200).json({ message: "Video liked", likes: video.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dislike a video
exports.dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user.id;

    if (!video) return res.status(404).json({ message: "Video not found" });

    // Remove from likes if exists
    video.likes = video.likes.filter((id) => id.toString() !== userId);

    // Add to dislikes if not already disliked
    if (!video.dislikes.some((id) => id.toString() === userId)) {
      video.dislikes.push(userId);
    }

    await video.save();
    res.status(200).json({ message: "Video disliked", dislikes: video.dislikes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a video (only by uploader)
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this video" });
    }

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
