const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", verifyToken, addComment);
router.put("/:commentId", verifyToken, editComment);
router.delete("/:commentId", verifyToken, deleteComment);

module.exports = router;
