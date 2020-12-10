import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AccentButton from './AccentButton';
import '../style/CreateJoinWait.scss';

const hardcodedList = ["Kelley", "Karl"];

const players = hardcodedList.map((name) => {
  return (
    <div>{name}</div>
  );
})

const WaitingRoom = () => {
  const [spin, setSpin] = useState(false);

  useEffect( () => {
    if (spin) {
      let timer = setTimeout(() => setSpin(false), 2000);
      return () => {
        clearTimeout(timer)
      }
    }

  }, [spin])

  const handleCloudClick = (e) => {
    setSpin(true);
  }

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
          <p className="white">no one will be able to join once it starts</p>
          <Link to={{pathname: "/"}}>
            <AccentButton>leave game</AccentButton>
          </Link>
          <h6>PLAYERS</h6>
          <div className="white">
            {players}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WaitingRoom;
