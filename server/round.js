const roomToNumOfRounds = {};
const roomToCurrentRound = {};

const initRound = (room) => {
  // later enable host to adjust settings
  roomToNumOfRounds[room] = 1;
  roomToCurrentRound[room] = 1;
}
const getNumOfRounds = (room) => roomToNumOfRounds[room]
const getCurrentRound = (room) => roomToCurrentRound[room]
const updateCurrentRound = (room) => roomToCurrentRound[room] += 1;

module.exports = {
  initRound, getNumOfRounds, getCurrentRound, updateCurrentRound
}
