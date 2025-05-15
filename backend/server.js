const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const authRoutes = require("./routes/authRoute.js")
const userRoutes = require("./routes/userRoute.js")
const videoRoutes = require("./routes/videoRoute.js");


//Middleware
const app = express()

app.use(cors({
    origin: "http://localhost:5173", // frontend
    credentials: true
  }));
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);



app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.get("/",(req,res)=>{
    res.status(200).json({message: "API is running..."})
})

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})