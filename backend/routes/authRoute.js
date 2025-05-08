const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


// 1. Configure multer storage
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });


const { register, login } = require("../controllers/authController.js")




router.post("/register",upload.single("avatar"), register);
router.post("/login", login)

module.exports = router