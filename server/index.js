// Imports for express
const express = require('express');
const app = express();
// Imports for socketio
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
  socket.emit('id', socket.id);

  socket.on("sendMessage",({ message, id }) => {
    io.emit("message", { message, id });
  });
});

server.listen(PORT,() => console.log(`server listening on port: ${PORT}`));
