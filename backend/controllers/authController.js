const User = require("../models/UserModel.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hashSync(password, 10);
        const newUser = new User(
            {
                username, email, password: hash,
                avatar: req.file ? `/uploads/${req.file.filename}` : null,
            }
        )
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email id" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ token, user: { username: user.username, email: user.email } });

    }
    catch (err) {
        res.status(500).json({ error: "Something wrong err.message" });
    }
}