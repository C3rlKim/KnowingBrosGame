import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import socket from '../socket.js';

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // ******
  // Have to talk to Kelley about how the room and user data will enter this component
  // The current way below is deprecated
  // const location = useLocation();

  // const roomName = useRef(location.state.roomName);
  // const userName = useRef(location.state.userName);
  let { roomname, username } = useParams();
  const roomName = roomname;
  const userName = username;

  useEffect(() => {
    // Listening to message from server
    socket.on("serverMessage", (msgObj) => {
      setMessages(prevMsgs =>[ ...prevMsgs, msgObj ]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    socket.emit("sendMessage",{ input, userName: userName, roomName: roomName }, () => {
      // socket.io acknowledgement
      setInput("");
    });
  }

  return (
    <div>
      <p>Room name: {roomName}</p>
      {messages.map((msgObj, idx) => <p key={idx}>{msgObj.userName} : {msgObj.message}</p>)}
      <input type="text"
        value={input}
        onChange={({ target : { value }}) => setInput(value)}
        onKeyPress={ (event) => event.key === "Enter" ? sendMessage(event) : null}
      />
      <input type="submit" onClick={sendMessage}/>
    </div>
  );
}

export default Chat;
