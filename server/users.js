// Concept of Closure

const roomToUsersSet = {};
const roomToUsersArray = {};
const inGameRooms = new Set();

const roomExists = (room) => room in roomToUsersSet;

const nameIsTaken = ({ name, room }) => roomToUsersSet[room].has(name);

const roomIsInGame = (room) => inGameRooms.has(room);

const addUser = ({ name, room }) => {
  if(!roomExists(room)) {
    roomtToUsersSet = new Set();
    roomToUsersArray[room] = [];
  }
  roomToUsersSet[room].add(name);
  roomToUsersArray[room].push(name);
}

const getHost = (room) => roomToUsersArray[rooom][0];

const getUsersInRoom = (room) => roomToUsersArray[room];

const addToInGame = (room) => inGameRooms.add(room);

module.exports = {
  roomExists, nameIsTaken, roomIsInGame, addUser, getHost, getUsersInRoomm, addToInGame
};
