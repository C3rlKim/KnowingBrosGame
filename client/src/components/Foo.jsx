import React, { useEffect } from 'react';

// Import socket.io client
import io from 'socket.io-client';

// ENDPOINT of socket.io server
const ENDPOINT = "http://localhost:5000"

const  Foo = () => {
  // Empty array as 2nd argument:
  // Rendered only onmount and unmount
  useEffect(() => {
    // socket.io connection started
    const socket = io(ENDPOINT);
  },[]);

  return <h1>Karl and Kelley's Game Client</h1>
}

export default Foo;
