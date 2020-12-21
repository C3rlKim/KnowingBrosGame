import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AccentButton from './AccentButton';
import '../style/CreateJoinWait.scss';

import socket from '../socket';

const WaitingRoom = () => {
  const [players, setPlayers] = useState([]);
  const [spin, setSpin] = useState(false);

  const handleCloudClick = (e) => {
    setSpin(true);
  }
  // Even though the effect is only called once
  // the socket will be continue to listen
  useEffect( () => {
    // Setting up an event listener before
    // confirming to the server that the user was added
    socket.on("playersInRoom",(updatedList) => {
      setPlayers(updatedList);
    });
    socket.emit("userAdded");
  }, [])

  useEffect( () => {
    if (spin) {
      let timer = setTimeout(() => setSpin(false), 2000);
      return () => {
        clearTimeout(timer)
      }
    }

  }, [spin])

  return (
    <Container fluid className="purple">
      <div id="background-wrap">
        <div className="x1">
          <div className="cloud"></div>
        </div>

        <div className="x2">
          <div className="cloud"></div>
        </div>

        <div className="x3">
          <div className="cloud"></div>
        </div>

        <div className="x4">
          <div id="special" className={spin ? "cloud spin" : "cloud"} onClick={handleCloudClick}></div>
        </div>

        <div className="x5">
          <div className="cloud"></div>
        </div>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={3} className="m-auto">
          <h1>waiting room</h1>
          <p className="white">host will start the game one all players have joined</p>
          <Link to="/">
            <AccentButton>leave game</AccentButton>
          </Link>
          <h6>PLAYERS</h6>
          <div className="white">
            {players.map((player,idx) => <div key={idx}> {player} </div>)}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WaitingRoom;
