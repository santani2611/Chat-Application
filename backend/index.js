import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connectDB from "./config/database.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Create HTTP server & attach socket
const server = http.createServer(app);
initSocket(server); // 👈 Attach socket to server

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});





