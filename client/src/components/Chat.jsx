import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
// Should the connection begin in login?
let socket = io(ENDPOINT);

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const roomName = useRef(location.state.roomName);
  const userName = useRef(location.state.userName);

  useEffect(() => {
    // Request to join room
    socket.emit("join", roomName.current);

    // Listening to message from server
    socket.on("serverMessage", (msgObj) => {
      setMessages(prevMsgs =>[ ...prevMsgs, msgObj ]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    socket.emit("sendMessage",{ input, userName: userName.current, roomName: roomName.current }, () => {
      // socket.io acknowledgement
      setInput("");
    });
  }

  return (
    <div>
      <p>Room name: {roomName.current}</p>
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
