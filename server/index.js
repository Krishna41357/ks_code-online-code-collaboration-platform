import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import errorAnalyzingRoutes from "./routes/errorAnalyzingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { setupSocket } from "./socket/socket.js";
import fileRoutes from "./routes/fileRoutes.js"

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🔥 Initialize socket logic
setupSocket(io);

const PORT = process.env.PORT || 5000;

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/errorAnalyze", errorAnalyzingRoutes);
app.use("/api/files" , fileRoutes)
// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
