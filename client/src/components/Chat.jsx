import React, { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import socket from '../socket.js';

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    if(input==="") {
      return;
    }

    socket.emit("sendMessage", { input }, () => {
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
    if (msgObj.isAudio) {
      return (
        <div key={idx}>
          <p>{msgObj.userName}:</p>
          <audio controls src={msgObj.message} />
        </div>
      );
    }
    if (msgObj.isGuesser)
      return <p style={{color: "lightgreen"}} key={idx}>You guessed the right answer: {msgObj.message}</p>

    if (msgObj.guesser)
      return <p style={{color: "lightgreen"}} key={idx}>{msgObj.guesser} guessed the right answer!</p>

    if (msgObj.isCensored)
      return <p style={{color: "lightsteelblue"}} key={idx}>Illegal action: {msgObj.userName} attempted to reveal the right answer.</p>

    if (msgObj.hasLeftRoom)
      return <p style={{color: "black"}} key={idx}>{msgObj.userName} has left.</p>

    if (msgObj.hasJoinedRoom)
      return <p style={{color: "black"}} key={idx}>{msgObj.userName} has joined.</p>

    return <p style={{color: msgObj.isClose ? "yellow" : ""} } key={idx}>{msgObj.userName} : {msgObj.message}</p>
  });

  return (
    <div id="chatBox">
      <div id="messageBox">
        <ScrollToBottom>
          {messageGroup}
        </ScrollToBottom>
      </div>
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
