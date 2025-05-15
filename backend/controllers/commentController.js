const { Comment, Video } = require("../models/videoModel");

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const userId = req.user.id;

    if (!videoId || !text) {
      return res.status(400).json({ message: "Video ID and comment text are required." });
    }

    const newComment = new Comment({ userId, text });
    await newComment.save();

    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a comment
exports.editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Remove the comment from the comments collection
    await Comment.findByIdAndDelete(commentId);

    // Remove the comment reference from any video it's in
    await Video.updateMany({ comments: commentId }, { $pull: { comments: commentId } });

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
