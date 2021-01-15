const Deque = require('collections/deque');
const _ = require('lodash');

const roomToUsersSet = {};
const roomToUsersArray = {};
const inGameRooms = new Set();
const idToUser = {};
const roomToJudge = {};
const roomToJudgePool = {};
const roomToTrackNum = {};
const roomToAnswer = {}
const roomToTime = {};
const roomToGameStatus = {};
const roomToUserToPoints = {};
const roomToSetOfCorrectGuessers = {};
const roomToIdArray = {};


// Addition and removal of user functions
const addUser = (name, room, id) => {
  if(!roomExists(room)) {
    roomToUsersSet[room] = new Set();
    roomToUsersArray[room] = [];
    roomToUserToPoints[room] = {};
    roomToIdArray[room] = [];
  }
  roomToUsersSet[room].add(name);
  roomToUsersArray[room].push(name);
  idToUser[id] = { name, room };
  roomToIdArray[room].push(id);
}
const removeUser = (name, room, id) => {
  roomToUsersSet[room].delete(name);
  roomToUsersArray[room].splice(roomToUsersArray[room].indexOf(name), 1);
  delete idToUser[id];
  roomToIdArray[room].splice(roomToIdArray[room].indexOf(id), 1);

  if(roomIsInGame(room)){
    delete roomToUserToPoints[room][name];
    roomToSetOfCorrectGuessers[room].delete(name);
  }
}

// Validation functions
const roomExists = (room) => room in roomToUsersSet
const nameIsTaken = (name, room) => roomToUsersSet[room].has(name)

// get user(s) functions
const getUsersInRoom = (room) => roomToUsersArray[room]
const getNumOfUsersInRoom = (room) => roomToUsersArray[room].length
const getUser = (id) => idToUser[id]

// In game Check functions
const addToInGame = (room) => inGameRooms.add(room)
const roomIsInGame = (room) => inGameRooms.has(room)
const removeFromInGame = (room) => inGameRooms.delete(room)

// Judge functions
const initJudge = (room) => {
  const shuffledUsers = _.shuffle(roomToUsersArray[room]);

  if(!roomToJudgePool[room]) roomToJudgePool[room] = new Deque();
  for(const user of shuffledUsers){
    // adding user to the front of the deque
    roomToJudgePool[room].unshift(user);
  }
  const newJudge = roomToJudgePool[room].pop();
  roomToJudge[room] = newJudge;
}
const getJudgePoolSize = (room) => roomToJudgePool[room].length
const getJudge = (room) => roomToJudge[room]
const updateJudge = (room) => {
  const newJudge = roomToJudgePool[room].pop();
  roomToJudge[room] = newJudge;
}

// TrackNum and Answer functions
const getTrackNum = (room) => roomToTrackNum[room]
const getAnswer = (room) => roomToAnswer[room]
const updateTrackNum = (room, trackNum) => roomToTrackNum[room] = trackNum
//replace dashes, remove extra spaces & non-alahanumeric characters
const updateAnswer = (room, answer) => roomToAnswer[room] = answer.replace(/-/g, ' ').replace(/\s+/g,' ').replace(/[^0-9a-z ]/gi, '').trim().toLowerCase();

// Time functions
const initTime = (room) => roomToTime[room] = 60
const getTime = (room) => roomToTime[room]
const updateTime = (room) => roomToTime[room] -= 1

// Game status functions
const initGameStatus = (room) => roomToGameStatus[room] = "chooseWait"
const getGameStatus = (room) => roomToGameStatus[room]
const updateGameStatus = (room, status) => roomToGameStatus[room] = status

// Correct Guesser functions
const initCorrectGuessers = (room) => roomToSetOfCorrectGuessers[room] = new Set()
const addCorrectGuesser = (name, room) => roomToSetOfCorrectGuessers[room].add(name)
const isCorrectGuesser = (name, room) => roomToSetOfCorrectGuessers[room].has(name)
const getNumOfCorrectGuessers = (room) => roomToSetOfCorrectGuessers[room].size
const clearCorrectGuessers = (room) => roomToSetOfCorrectGuessers[room].clear()

// Points functions
const initPoints = (room) => {
  for (const user of roomToUsersArray[room]){
    roomToUserToPoints[room][user] = 0;
  }
}
const updatePoints = (name, room, points) => roomToUserToPoints[room][name] += points
const getPoints = (name, room) => roomToUserToPoints[room][name]
const getSortedUsersPoints = (room) => {
  let userPointsArray = [];
  for (const user of roomToUsersArray[room]){
    userPointsArray.push({ userName: user, points: roomToUserToPoints[room][user] });
  }
  return _.sortBy(userPointsArray, (userPointsObj) => -userPointsObj.points);
}

// Match functions
const containsMatch = (input, answer) => {
  let answerArray = answer.split(" ");
  for (word of answerArray) {
    if (!input.includes(word)) return false;
  }
  return true;
}
const isMatch = (input, answer) => {
  let answerArray = answer.split(" ");

  //replace dashes, in case user inputs 'artist-song title'
  //remove extra spaces & non-alahanumeric characters
  const inputArray = input.replace(/-/g, ' ').replace(/\s+/g,' ').replace(/[^0-9a-z ]/gi, '').trim().toLowerCase().split(" ");

  //can store map later to improve efficiency (although will have to make a copy each time anyways)
  let answerMap = new Map(); //word->num of occurrences
  for (word of answerArray) {
    if (answerMap.has(word)) {
      answerMap.set(word, answerMap.get(word) + 1);
    }
    else {
      answerMap.set(word, 1);
    }
  }

  let occurrences;
  let extra = 0;
  for (word of inputArray) {
    if (answerMap.has(word)) {
      occurrences = answerMap.get(word) - 1;
      if (occurrences == 0) answerMap.delete(word);
      else answerMap.set(word, occurrences);
    }
    else extra++;
  }
  return extra + answerMap.size;//extra input + missing words from answer
}

// socket IDs functions
const getIdsInRoom = (room) => roomToIdArray[room];

module.exports = {
  addUser, removeUser,
  roomExists, nameIsTaken,
  getUsersInRoom, getNumOfUsersInRoom, getUser,
  addToInGame, roomIsInGame, removeFromInGame,
  initJudge, getJudgePoolSize, getJudge, updateJudge,
  getTrackNum, getAnswer, updateTrackNum, updateAnswer,
  initTime, getTime, updateTime,
  initGameStatus, getGameStatus, updateGameStatus,
  initCorrectGuessers, addCorrectGuesser, isCorrectGuesser, getNumOfCorrectGuessers, clearCorrectGuessers,
  initPoints, updatePoints, getPoints, getSortedUsersPoints,
  containsMatch, isMatch,
  getIdsInRoom
};
