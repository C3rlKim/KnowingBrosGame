import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import AccentButton from './AccentButton';

import '../style/CreateJoinWait.scss';

import socket from '../socket';

const WaitRoom = ({ setRenderedComp }) => {
  const [spin, setSpin] = useState(false);
  const [players, setPlayers] = useState([]);
  const [errorMess, setErrorMess] = useState("");

  const handleCloudClick = (e) => {
    setSpin(true);
  }

  const handleAlertClose = () => {
    setErrorMess("");
  }

  const handleLeave = () => {
    socket.emit("leaveGame",() => {
      setRenderedComp("landing");
    });
  }

  const handleStart = () => {
    if(players.length < 2){
      setErrorMess("Need at least 2 people to play");
      return;
    }
    socket.emit("startClicked");
  }

  // Even though the effect is only called once
  // the socket will be continue to listen
  useEffect( () => {
    socket.on("playersInRoom",(updatedList) => {
      setPlayers(updatedList);
    });
    socket.emit("getPlayersInRoom");

    socket.on("startGame", () => {
      setRenderedComp("gameroom");
    });
  }, []);

  useEffect( () => {
    if (spin) {
      let timer = setTimeout(() => setSpin(false), 2000);
      return () => {
        clearTimeout(timer)
      }
    }

  }, [spin]);

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
          <p className="white">host will start the game once all players have joined</p>
          <AccentButton onClick={handleLeave}>leave game</AccentButton>
          <AccentButton onClick={handleStart}>start game</AccentButton>
          {errorMess &&
            <Alert variant="danger" onClose={handleAlertClose} dismissible>{errorMess}</Alert>
          }
          <h6>PLAYERS</h6>
          <div className="white">
            {players.map((player) => <div key={player}> {player} </div>)}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WaitRoom;
