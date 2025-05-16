const Channel = require("../models/channelModel");
const { Video } = require("../models/videoModel");

// Create new channel
exports.createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    const existing = await Channel.findOne({ owner: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "User already has a channel" });
    }

    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner: req.user.id,
    });

    await newChannel.save();
    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a channel and its videos
exports.getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username avatar")
      .populate({
        path: "videos",
        populate: { path: "uploader", select: "username" }
      });

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update channel info
exports.updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this channel" });
    }

    const { channelName, description, channelBanner } = req.body;
    if (channelName) channel.channelName = channelName;
    if (description) channel.description = description;
    if (channelBanner) channel.channelBanner = channelBanner;

    await channel.save();
    res.status(200).json({ message: "Channel updated", channel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
