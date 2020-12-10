const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Start of connection
io.on("connect", socket => {
  // Join socket to a room specified by client
  socket.on("join", (roomName) => {
    socket.join(roomName);
  })
  // listen client's sendMessage and emits message to the room
  socket.on("sendMessage",({ input: message, userName, roomName }, msgConfirm) => {
    io.in(roomName).emit("serverMessage", { message, userName });
    msgConfirm();
  });
});

server.listen(PORT,() => console.log(`server listening on port: ${PORT}`));
