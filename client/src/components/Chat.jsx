import React, { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import socket from '../socket.js';

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = event => {
    event.preventDefault();

    if(input==="") {
      return;
    }
    
    socket.emit("sendMessage", { input }, () => {
      // socket.io acknowledgement
      setInput("");
    });
  }

  useEffect(() => {
    //Listening to message from server
    socket.on("serverMessage", (msgObj) => {
      setMessages(prevMsgs => [...prevMsgs, msgObj]);
    });
  }, [])

  const messageGroup = messages.map((msgObj, idx) => {
    return msgObj.isAudio ?
    <div key={idx}>
      <p>{msgObj.userName}:</p>
      <audio controls src={msgObj.message} />
    </div>
    :
    <p key={idx}>{msgObj.userName} : {msgObj.message}</p>
  });

  return (
    <div>
      <ScrollToBottom>
        {messageGroup}
      </ScrollToBottom>
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
