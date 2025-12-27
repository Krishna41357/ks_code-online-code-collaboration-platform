import {autoSaveFileService} from "../services/FileService.js"
import jwt from "jsonwebtoken";

const getUserIdFromSocket = (socket) => {
  const token = socket.handshake.auth?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
};


export const setupSocket = (io) => {
  const userSocketMap = {};

  const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
      (socketId) => ({
        socketId,
        username: userSocketMap[socketId],
      })
    );
  };

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", ({ roomId, username }) => {
      userSocketMap[socket.id] = username;
      socket.join(roomId);

      const clients = getAllConnectedClients(roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit("joined", {
          clients,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.in(roomId).emit("code-change", { code });
    });

    socket.on("sync-code", ({ socketId, code }) => {
      io.to(socketId).emit("code-change", { code });
    });

    socket.on("auto-save" , async ({fileId , code})=>{
        const userId = getUserIdFromSocket(socket);
        if(!userId) return;
        await autoSaveFileService({
            fileId , 
            code , 
            userId
        })
    })

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit("disconnected", {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
    });
  });
};
