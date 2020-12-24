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
const {
  addUser, removeUser,
  roomExists, nameIsTaken,
  getHost, getUsersInRoom,
  addToInGame,roomIsInGame,
  getUser
} = require('./roomAndUser.js');

io.on("connect", socket => {
  console.log(`${socket.id} connected`);

  // Validates user input when creating or joining room
  // and handles creating room and joining
  socket.on("validation", ({ name, room, option }, callback) => {
    if(option === "create") {
      if(!roomExists(room)){
        // server in memory data store
        addUser(name, room, socket.id);
        // socket.io library data store
        socket.join(room);
        if(roomIsInGame(room)){
          callback("ingame");
        }
        else{
          callback("waitingroom");
        }
      }
      else{
        callback("invalid",`The room name "${room}" is already being used`);
      }
    }
    else {
      if(roomExists(room)){
        if(!nameIsTaken(name, room)){
          addUser(name, room, socket.id);
          socket.join(room);
          if(roomIsInGame(room)){
            callback("ingame")
          }
          else{
            callback("waitingroom");
          }
        }
        else{
          callback("invalid",`The username "${name}" is already being used`);
        }
      }
      else{
        callback("invalid",`The room "${room}" does not exist`);
      }
    }
  });

  // Server emits list of players in the room
  socket.on("getPlayersInRoom", () => {
    const room = getUser(socket.id).room;
    io.in(room).emit("playersInRoom",getUsersInRoom(room));
  });

  // Does not end socket connection, just exits from room
  socket.on("leaveGame", () => {
    const user = getUser(socket.id);
    removeUser(user.name,user.room,socket.id);
    socket.leave(user.room);
    socket.to(user.room).emit("playersInRoom",getUsersInRoom(user.room));
  });

  // Starts the game when a user clicks start
  socket.on("startClicked", () => {
    const user = getUser(socket.id)
    addToInGame(user.room);
    io.in(user.room).emit("startGame");
  });

  // Listen client's sendMessage and emits message to the room
  socket.on("sendMessage",(message, msgConfirm) => {
    const user = getUser(socket.id);
    io.in(user.room).emit("serverMessage", { message, userName: user.name });
    msgConfirm();
  });

  // Removes user from server data store and emits updated list of players in room
  // socket io automatically handles its own leaving room functionality
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    const user = getUser(socket.id);
    if(user) {
      removeUser(user.name,user.room,socket.id);
      socket.to(user.room).emit("playersInRoom",getUsersInRoom(user.room));
    }
  })
});

server.listen(PORT,() => console.log(`server listening on port: ${PORT}`));
