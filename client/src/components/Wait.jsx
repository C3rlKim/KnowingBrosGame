import React, { useEffect } from 'react';
import socket from '../socket';

const Wait = (props) => {
  const { handlePageChange} = props;

  useEffect(() => {
    socket.on("startGuessing", () => {
      handlePageChange("guess");
    })
  })

  return (
    <div>
      <p>waiting for judge to choose song</p>
    </div>
  );
}

export default Wait;
