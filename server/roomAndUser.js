const _ = require("lodash");

const roomToUsersSet = {};
const roomToUsersArray = {};
const inGameRooms = new Set();
const idToUser = {};
const roomToJudgeIdx = {};
const roomToRound = {};
const roomToTrackNum = {};
const roomToAnswer = {}
const roomToTime = {};
const roomToGameStatus = {};
const roomToUserToPoints = {};
const roomToSetOfCorrectGuessers = {};


// Addition and removal of user functions
const addUser = (name, room, id) => {
  if(!roomExists(room)) {
    roomToUsersSet[room] = new Set();
    roomToUsersArray[room] = [];
    roomToUserToPoints[room] = {};
  }
  roomToUsersSet[room].add(name);
  roomToUsersArray[room].push(name);
  roomToUserToPoints[room][name] = 0;
  idToUser[id] = { name, room };
}
const removeUser = (name, room, id) => {
  roomToUsersSet[room].delete(name);
  const nameIdx = roomToUsersArray[room].indexOf(name);
  roomToUsersArray[room].splice(nameIdx,1);
  delete roomToUserToPoints[room][name];
  delete idToUser[id];
}

// Validation functions
const roomExists = (room) => room in roomToUsersSet
const nameIsTaken = (name, room) => roomToUsersSet[room].has(name)

// get user(s) functions
const getUsersInRoom = (room) => roomToUsersArray[room]
const getUser = (id) => idToUser[id]

// In game Check functions
const addToInGame = (room) => inGameRooms.add(room)
const roomIsInGame = (room) => inGameRooms.has(room)

// Judge functions
const initJudge = (room) => {
  roomToUsersArray[room] = _.shuffle(roomToUsersArray[room]);
  roomToJudgeIdx[room] = 0;
}
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

// TrackNum and Answer functions
const getTrackNum = (room) => roomToTrackNum[room]
const getAnswer = (room) => roomToAnswer[room]
const updateTrackNum = (room, trackNum) => roomToTrackNum[room] = trackNum
const updateAnswer = (room, answer) => roomToAnswer[room] = answer


// Time functions
const initTime = (room) => roomToTime[room] = 60
const getTime = (room) => roomToTime[room]
const updateTime = (room) => roomToTime[room] -= 1

// Game status functions
const initGameStatus = (room) => roomToGameStatus[room] = "songSelection"
const getGameStatus = (room) => roomToGameStatus[room]
const updateGameStatus = (room, status) => roomToGameStatus[room] = status

// Point functions
const initCorrectGuessers = (room) => roomToSetOfCorrectGuessers[room] = new Set()
const addCorrectGuesser = (name, room) => roomToSetOfCorrectGuessers[room].add(name)
const isCorrectGuesser = (name, room) => roomToSetOfCorrectGuessers[room].has(name)
const updatePoints = (name, room, points) => roomToUserToPoints[room][name] += points
const getPoints = (name, room) => roomToUserToPoints[room][name]

module.exports = {
  addUser, removeUser,
  roomExists, nameIsTaken,
  getUsersInRoom, getUser,
  addToInGame,roomIsInGame,
  initJudge, getJudge, updateJudge,
  initRound,
  getTrackNum, getAnswer,
  updateTrackNum, updateAnswer,
  initTime, getTime, updateTime,
  initGameStatus, getGameStatus, updateGameStatus,
  initCorrectGuessers, addCorrectGuesser, isCorrectGuesser, updatePoints, getPoints
};
