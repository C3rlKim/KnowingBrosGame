// Don't think Map is too necessary compared to Object
const roomToUsersSet = {};
const roomToUsersArray = {};
const inGameRooms = new Set();
const idToUser = {};

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

const roomExists = (room) => room in roomToUsersSet
const nameIsTaken = (name, room) => roomToUsersSet[room].has(name)

// Host is the first user that was appended (for now)
const getHost = (room) => roomToUsersArray[room][0]
const getUsersInRoom = (room) => roomToUsersArray[room]

const addToInGame = (room) => inGameRooms.add(room)
const roomIsInGame = (room) => inGameRooms.has(room)

const getUser = (id) => idToUser[id]

// Concept of Closure
module.exports = {
  addUser, removeUser,
  roomExists, nameIsTaken,
  getHost, getUsersInRoom,
  addToInGame,roomIsInGame,
  getUser
};
