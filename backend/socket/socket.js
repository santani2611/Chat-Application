// socket.js
import { Server } from 'socket.io';

const userSocketMap = {};
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    const userId = socket.handshake.query.userId;
    console.log("🔗 Handshake userId:", userId);

    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export const getIO = () => io; // <-- export io getter
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]; // <-- export this too
