import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

// How do we get name and room in to this component
let socket;

const Chat = () => {
  const [id, setId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Start socket connection
    socket = io(ENDPOINT);
    socket.on("id",(socketId) => {
      setId(socketId);
    })
    socket.on("message", ({ message, id }) => {
      setMessages(prevMsgs =>[ ...prevMsgs, message ]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    socket.emit("sendMessage",{ message, id });
    setMessage("");
  }

  return (
    <div>
      <p>Your id is: {id} </p>
      {messages.map((message, idx) => <p key={idx}>{message}</p>)}
      <input type="text" value={message} onChange={({ target : { value }}) => setMessage(value)}/>
      <input type="submit" onClick={sendMessage}/>
    </div>
  );
}

export default Chat;
