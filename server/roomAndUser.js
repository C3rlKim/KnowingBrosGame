const _ = require("lodash");

const roomToUsersSet = {};
const roomToUsersArray = {};
const inGameRooms = new Set();
const idToUser = {};
const roomToJudgeIdx = {};
const roomToRound = {};
const roomToSong = {};
const roomToTime = {};

// Addition and removal of user functions
const addUser = (name, room, id) => {
  if(!roomExists(room)) {
    roomToUsersSet[room] = new Set();
    roomToUsersArray[room] = [];
  }
  roomToUsersSet[room].add(name);
  roomToUsersArray[room].push(name);
  idToUser[id] = { name, room };
}
const removeUser = (name, room, id) => {
  roomToUsersSet[room].delete(name);
  const nameIdx = roomToUsersArray[room].indexOf(name);
  roomToUsersArray[room].splice(nameIdx,1);
  delete idToUser.id;
}

// Validation functions
const roomExists = (room) => room in roomToUsersSet
const nameIsTaken = (name, room) => roomToUsersSet[room].has(name)

// get user(s) functions
const getUsersInRoom = (room) => roomToUsersArray[room]
const getUser = (id) => idToUser[id]

// InGame Check functions
const addToInGame = (room) => inGameRooms.add(room)
const roomIsInGame = (room) => inGameRooms.has(room)

// Judge Identification functions
const randomizeOrder = (room) => {
  roomToUsersArray[room] = _.shuffle(roomToUsersArray[room]);
}
const initJudgeIdx = (room) => roomToJudgeIdx[room] = 0;
const getJudge = (room) => {
  const judgeIdx = roomToJudgeIdx[room];
  return roomToUsersArray[room][judgeIdx];
}
const updateJudge = (room) => {
  const judgeIdx = roomToJudgeIdx[room];
  judgeIdx = (judgeIdx + 1) % roomToUsersArray[room].length;
}

// Round functions
const initRound = (room) => {
  // For now make the round length the number of users in room
  roomToRound[room] = getUsersInRoom(room).length
}

// Song functions
const updateSongToGuess = (room, song) => {
  roomToSong[room] = song;
}

// Time functions
const initTime = (room) => roomToTime[room] = 60;
const getTime = (room) => roomToTime[room];
const updateTime = (room) => roomToTime[room] -= 1;

// Concept of Closure
module.exports = {
  addUser, removeUser,
  roomExists, nameIsTaken,
  getUsersInRoom, getUser,
  addToInGame,roomIsInGame,
  randomizeOrder, initJudgeIdx, getJudge, updateJudge,
  initRound,
  updateSongToGuess,
  initTime, getTime, updateTime
};
