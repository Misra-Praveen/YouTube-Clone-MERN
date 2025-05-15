const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: ["Music", "Education", "Gaming", "Vlogs", "Tech", "Other"],
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment", // Reference to external comment document
  }],
}, { timestamps: true });

module.exports = {
  Video: mongoose.model("Video", videoSchema),
  Comment: mongoose.model("Comment", commentSchema),
};
