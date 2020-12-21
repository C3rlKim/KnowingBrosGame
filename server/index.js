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

const { roomExists, addUser, nameIsTaken, roomIsInGame, getUsersInRoom, getUser, removeUser } = require('./roomAndUser.js');

io.on("connect", socket => {
  // Validates user input when creating or joining room
  socket.on("validation", ({ name, room, option }, callback) => {
    if(option === "create") {
      if(!roomExists(room)){
        // Creates the room and adds user as host
        // server in memory data store
        addUser(name, room, socket.id);
        // socket.io library data store
        socket.join(room);
        callback("waitingroom");
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
          callback("invalid",`The username "${name}"" is already being used`);
        }
      }
      else{
        callback("invalid",`The room "${room}" does not exist`);
      }
    }
  });

  // Server emits list of players in the room once a new user is added
  socket.on("userAdded", () => {
    const room = getUser(socket.id).room;
    io.in(room).emit("playersInRoom",getUsersInRoom(room));
  });


  // Join socket to a room specisfied by client
  socket.on("join", (roomName) => {
    socket.join(roomName);
  })
  // Listen client's sendMessage and emits message to the room
  socket.on("sendMessage",({ input: message, userName, roomName }, msgConfirm) => {
    io.in(roomName).emit("serverMessage", { message, userName });
    msgConfirm();
  });

  // Removes user from server data store and emits updated list of players in room
  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    removeUser(user.name,user.room,socket.id);
    socket.to(user.room).emit("playersInRoom",getUsersInRoom(user.room));
  })
});

server.listen(PORT,() => console.log(`server listening on port: ${PORT}`));
