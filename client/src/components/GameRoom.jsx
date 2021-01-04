import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Results from './Results';
import ChooseSong from './ChooseSong';
import Guess from './Guess';
import Wait from './Wait';
import HintOptions from './HintOptions';
import Chat from './Chat';

import '../style/GameRoom.scss';

import socket from '../socket'


const GameRoom = () => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState("");
  const [showPlayerPanel, setShowPlayerPanel] = useState(true);
  const [showChatPanel, setShowChatPanel] = useState(true);
  const [timer, setTimer] = useState();
  const [renderReady, setRenderReady] = useState(false);

  const handlePageChange = (newpage) => {
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

  useEffect(() => {
    socket.on("playersInRoom",(updatedList) => {
      setPlayers(updatedList);
    });
    socket.emit("getPlayersInRoom");

    socket.on("timer", (serverTime) => {
      setTimer(serverTime);
    });

    socket.emit("getPage",(page) => {
      setPage(page);
    });
  }, [])

  useEffect(() => {
    // skips the first render
    if (page) setRenderReady(true);
  }, [page])

  const loader = (
    <div>
      <Spinner animation="grow"/>
    </div>
  )
  const component = (
    <Row className="roomRow align-items-center">
      <Col xs={4} sm={3} xl={2} className="roomCol">
        {timer}
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
              (page==="choose" && <ChooseSong handlePageChange={handlePageChange}/>)
          ||  (page==="wait" && <Wait handlePageChange={handlePageChange} />)
          ||  (page==="hint" && <HintOptions handlePageChange={handlePageChange} />)
          ||  (page==="guess" && <Guess handlePageChange={handlePageChange} />)
          ||  (page==="results" && <Results handlePageChange={handlePageChange} />)
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
  )

  return (
    <Container fluid id="room" >
      {renderReady
      ? component
      : loader
      }
    </Container>
  );
}

export default GameRoom;
