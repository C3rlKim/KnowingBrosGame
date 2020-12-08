import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Results from './Results';
import ChooseSong from './ChooseSong';
import Guess from './Guess';
import Wait from './Wait';
import Chat from './Chat';

import '../style/Room.scss';

const Room = () => {
  let isJudge = true; //add logic to determine whether judge or guesser

  const [page, setPage] = useState("choose");
  const [showPlayerPanel, setShowPlayerPanel] = useState(true);
  const [showChatPanel, setShowChatPanel] = useState(true);

  const handler = (newpage) => {
    setPage(newpage);
  }

  const handlePlayerPanelClick = (newpage) => {
    setShowPlayerPanel((prev) => !prev);
  }

  const handleChatPanelClick = (newpage) => {
    setShowChatPanel((prev) => !prev);
  }

  const Page = () => {
    if (isJudge) {
      if (page === "choose") return <ChooseSong handler={handler} />;
      if (page === "wait") return <Wait isJudge={isJudge} handler={handler} />
    }
    else {
      if (page === "wait") return <Wait isJudge={isJudge} handler={handler} />;
      if (page === "guess") return <Guess handler={handler} />;
    }
    return <Results handler={handler} />;
  }

  const playerList = ["one", "two", "three"]; //change

  const players = playerList.map((player) => (
    <li key={player}>{player}</li>
  ));

  return (
    <Container fluid id="room" >
      <Row className="roomRow align-items-center">
        <Col xs={4} sm={3} xl={2} className="roomCol">

          {showPlayerPanel
          ? <div className="panel playerPanel" onClick={handlePlayerPanelClick}>
              <h2>players</h2>
              <ul>
                {players}
              </ul>
            </div>
          : <div className="panel playerPanel closed" onClick={handlePlayerPanelClick}></div>
          }

        </Col>

        <Col xs={4} sm={6} xl={8} >
          <Page />
        </Col>

        <Col xs={4} sm={3} xl={2} className="roomCol">

          {showChatPanel
          ? <div className="panel chatPanel" onClick={handleChatPanelClick}>
              <h2>chat</h2>
              filler, replace with chat later
            </div>
          : <div className="panel closed chatPanel" id="chatPanelClosed" onClick={handleChatPanelClick}></div>
          }

          
        </Col>
      </Row>
    </Container>
  );
}

export default Room;