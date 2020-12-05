import React from 'react';

// Import socket.io client
import io from "socket.io-client";

// ENDPOINT of socket.io server
const ENDPOINT = 'http://localhost:5000'

let socket;

const  Foo = () => {
  // socket.io connection started
  socket = io(ENDPOINT);
  
  return <h1>Karl and Kelley's Game Client</h1>
}

export default Foo;
