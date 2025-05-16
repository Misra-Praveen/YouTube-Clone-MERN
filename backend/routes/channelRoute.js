const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createChannel,
  getChannelById,
  updateChannel,
} = require("../controllers/channelController");

router.post("/", verifyToken, createChannel);
router.get("/:id", getChannelById);
router.put("/:id", verifyToken, updateChannel);

module.exports = router;
