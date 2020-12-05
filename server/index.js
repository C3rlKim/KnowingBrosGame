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

app.get('/',(req,res) => {
  res.send("Karl and Kelley's server")
});

// Start of connection
io.on('connect', (socket) => {

});

server.listen(PORT,() => console.log(`server listening on port: ${PORT}`));
