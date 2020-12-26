const _ = require("lodash");

const roomToUsersSet = {};
const roomToUsersArray = {};
const inGameRooms = new Set();
const idToUser = {};
const roomToJudgeIdx = {};

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
  // Should figure out a better data structure to efficiently handle
  const nameIdx = roomToUsersArray[room].indexOf(name);
  roomToUsersArray[room].splice(nameIdx,1);
  delete idToUser.id;
}

// Validation functions
const roomExists = (room) => room in roomToUsersSet
const nameIsTaken = (name, room) => roomToUsersSet[room].has(name)

// get User and UsersInRoom functions
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

// Concept of Closure
module.exports = {
  addUser, removeUser,
  roomExists, nameIsTaken,
  getUsersInRoom, getUser,
  addToInGame,roomIsInGame,
  randomizeOrder, initJudgeIdx, getJudge, updateJudge
};
