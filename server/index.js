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
  getTrackNum, getAnswer,
  updateTrackNum, updateAnswer,
  containsMatch, isMatch,
  initTime, getTime, updateTime,
  initGameStatus, getGameStatus, updateGameStatus,
  initCorrectGuessers, addCorrectGuesser, isCorrectGuesser, updatePoints, getPoints
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
            socket.to(room).emit("serverMessage", { userName: name, hasJoinedRoom: true });
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

  // Does not end socket connection, just cleans up user related data
  socket.on("leaveGame", (callback) => {
    const user = getUser(socket.id);
    removeUser(user.name,user.room,socket.id);
    socket.leave(user.room);
    callback();
    io.in(user.room).emit("playersInRoom",getUsersInRoom(user.room));
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
    initCorrectGuessers(user.room);

    io.in(user.room).emit("startGame");
  });

  // Responds with where the user ui should be
  // in terms of game status and user role
  socket.on("getPage", (callback) => {
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
  });

  // Stores the song selected and advance UI
  socket.on("songSelected", (trackNum, answer, judgeToHintUI) => {
    const user = getUser(socket.id);
    updateTrackNum(user.room, trackNum);
    updateAnswer(user.room, answer);
    console.log(`The answer for ${user.room} is ${getAnswer(user.room)}`);

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
      io.in(user.room).emit("timer", getTime(user.room));
    }, 1000)
  });

  socket.on("getSelectedSong", () => {
    const user = getUser(socket.id);
    socket.emit("selectedSong", getTrackNum(user.room));
  });

  // Send song snippet hint to guessers
  socket.on("playSnippetClicked", (seconds) => {
    const user = getUser(socket.id);
    socket.to(user.room).emit("playSnippet", seconds);
  });

  // Listen client's sendMessage and emits message to the room
  socket.on("sendMessage", ({ input, mediaBlobUrl }, msgConfirm) => {
    const user = getUser(socket.id);
    const answer = getAnswer(user.room);
    const canGuess = !isCorrectGuesser(user.name, user.room) && user.name !== getJudge(user.room);

    if (input) {
      let difference = answer ? isMatch(input, answer) : undefined;
      if (answer && canGuess && difference == 0) { //a match
        // Points in relation to how fast the user guessed
        const points = getTime(user.room);
        updatePoints(user.name,user.room, points);
        console.log(`${user.name} obtained ${getPoints(user.name,user.room)} points!`);

        addCorrectGuesser(user.name, user.room);
        socket.emit("serverMessage", { message: input, userName: user.name, isGuesser: true });
        socket.to(user.room).emit("serverMessage", { message: input, userName: user.name, guesser: user.name });
      }
      else if (answer && canGuess && difference < 2) io.in(user.room).emit("serverMessage", { message: input, userName: user.name, isClose: true });
      else if (answer && !canGuess && containsMatch(input, answer)) {
        io.in(user.room).emit("serverMessage", { message: mediaBlobUrl, userName: user.name, isCensored: true });
      }
      else io.in(user.room).emit("serverMessage", { message: input, userName: user.name });
    }

    else {
      io.in(user.room).emit("serverMessage", { message: mediaBlobUrl, userName: user.name, isAudio: true });
    }

    msgConfirm();
  });

  // Includes page refresh
  // socket io disconnect event auto handles its own leave room functionality
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    const user = getUser(socket.id);
    // Skip if user disconnects without creating user name data
    if(user) {
      removeUser(user.name,user.room,socket.id);
      console.log("user data cleaned");
      socket.to(user.room).emit("serverMessage", { userName: user.name, hasLeftRoom: true });
      socket.to(user.room).emit("playersInRoom", getUsersInRoom(user.room));
    }
  })
});

server.listen(PORT,() => console.log(`server listening on port: ${PORT}`));
