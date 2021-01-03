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
  getUsersInRoom, getUser,
  addToInGame,roomIsInGame,
  initJudge, getJudge, updateJudge,
  initRound,
  updateSongToGuess,
  initTime, getTime, updateTime,
  initGameStatus, getGameStatus, updateGameStatus
} = require('./roomAndUser.js');

io.on("connect", socket => {
  console.log(`${socket.id} connected`);

  // Validates user input when creating or joining room
  // and handles creating room and joining
  socket.on("validation", ({ name, room, option }, callback) => {
    if(option === "create") {
      if(!roomExists(room)) {
        // server in memory data store
        addUser(name, room, socket.id);
        // socket.io library data store
        socket.join(room);
        callback("waitroom");
      }
      else {
        callback("invalid",`The room name "${room}" is already being used`);
      }
    }
    else if (option === "join") {
      if(roomExists(room)) {
        if(!nameIsTaken(name,room)) {
          addUser(name, room, socket.id);
          socket.join(room);
          if(roomIsInGame(room)) {
            callback("gameroom");
          }
          else {
            callback("waitroom");
          }
        }
        else {
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
  socket.on("leaveGame", (callback) => {
    const user = getUser(socket.id);
    removeUser(user.name,user.room,socket.id);
    socket.leave(user.room, () => {
      socket.to(user.room).emit("playersInRoom",getUsersInRoom(user.room));
      callback();
    });
  });

  // Starts the game when a user clicks start
  socket.on("startClicked", () => {
    const user = getUser(socket.id)
    // In case more than one user press start game
    if(roomIsInGame(user.room)){
      return;
    }

    addToInGame(user.room);
    initJudge(user.room);
    initRound(user.room);
    initGameStatus(user.room);

    io.in(user.room).emit("startGame");
  });

  // Responds with where the user ui should be
  // in terms of game status and user role
  socket.on("getPage",(callback) => {
    const user = getUser(socket.id);

    const gameStatus = getGameStatus(user.room);
    let userIsJudge;

    if(user.name===getJudge(user.room)){
      userIsJudge = true;
      console.log(`${user.name} is the judge`);
    }
    else{
      userIsJudge = false;
      console.log(`${user.name} is the guesser`);
    }

    if (gameStatus === "songSelection") {
      userIsJudge ? callback("choose") : callback("wait")
    }
    else if (gameStatus === "guessSong") {
      userIsJudge ? callback("hint") : callback("guess")
    }
    else if (gameStatus === "displayResults") {
      callback("results");
    }
  })

  // Stores the song selected and advance UI
  socket.on("songSelected",(song, judgeToHintUI) => {
    const user = getUser(socket.id);
    updateSongToGuess(user.room,song);

    // async issues
    updateGameStatus(user.room, "guessSong");
    socket.to(user.room).emit("startGuessing");
    judgeToHintUI();

    // Timer
    initTime(user.room);
    const timeInterval =  setInterval(()=> {
      if(getTime(user.room) === 0){
        clearInterval(timeInterval);
        // add logic of end of round
      }
      updateTime(user.room);
      io.in(user.room).emit("timer",getTime(user.room));
    }, 1000)
  })

  // Listen client's sendMessage and emits message to the room
  socket.on("sendMessage",({ input, mediaBlobUrl }, msgConfirm) => {
    const user = getUser(socket.id);
    let message, isAudio;
    if (input) {
      message = input;
      isAudio = false;
    }
    else {
      message = mediaBlobUrl;
      isAudio = true;
    }
    io.in(user.room).emit("serverMessage", { message, userName: user.name, isAudio });
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
