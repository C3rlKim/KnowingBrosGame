import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Results from './Results';
import ChooseSong from './ChooseSong';
import Guess from './Guess';
import Wait from './Wait';
import Chat from './Chat';

import '../style/GameRoom.scss';

import socket from '../socket'


const GameRoom = () => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState("choose");
  const [showPlayerPanel, setShowPlayerPanel] = useState(true);
  const [showChatPanel, setShowChatPanel] = useState(true);
  const [isJudge, setIsJudge] = useState();

  const handler = (newpage) => {
    setPage(newpage);
  }

  const handlePlayerPanelClick = (e) => {
    e.preventDefault();
    setShowPlayerPanel((prev) => !prev);
  }

  const handleChatPanelClick = (e) => {
    e.preventDefault();
    //setShowChatPanel((prev) => !prev);
  }

  // have to figure out async issues with components not ready but being rendered
  useEffect(() => {
    socket.on("playersInRoom",(updatedList) => {
      setPlayers(updatedList);
    });
    socket.emit("getPlayersInRoom");

    socket.emit("checkIfJudge",(isJudgeBool) => {
      setIsJudge(isJudgeBool);
    });
  }, [])

  return (
    <Container fluid id="room" >
      <Row className="roomRow align-items-center">
        <Col xs={4} sm={3} xl={2} className="roomCol">
          {showPlayerPanel
          ? <div className="panel playerPanel" onClick={handlePlayerPanelClick}>
              <h2>players</h2>
              <ul>
                {players.map((player) => <li key={player}> {player} </li>)}
              </ul>
            </div>
          : <div className="panel playerPanel closed" onClick={handlePlayerPanelClick}></div>
          }
        </Col>

        <Col xs={4} sm={6} xl={8} >
          {
                (page==="choose" && <ChooseSong handler={handler}/>)
            ||  (page==="wait" && <Wait isJudge={isJudge} handler={handler} />)
            ||  (page==="guess" && <Guess handler={handler} />)
            ||  (page==="results" && <Results handler={handler} />)
          }
        </Col>

        <Col xs={4} sm={3} xl={2} className="roomCol">
          {showChatPanel
          ? <div className="panel chatPanel" onClick={handleChatPanelClick}>
              <h2>chat</h2>
              <Chat/>
            </div>
          : <div className="panel closed chatPanel" id="chatPanelClosed" onClick={handleChatPanelClick}></div>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default GameRoom;
