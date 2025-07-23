import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

// Example route
app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});



app.get("/", (_req, res) => res.send("API running 🚀"));

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("sendMessage", (msg) => {
    console.log("Message:", msg);
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
