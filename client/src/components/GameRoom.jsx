import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import ScrollToBottom from 'react-scroll-to-bottom';

import Chat from './Chat';
import ChooseSong from './ChooseSong';
import Wait from './Wait';
import HintOptions from './HintOptions';
import Guess from './Guess';
import Results from './Results';


import '../style/GameRoom.scss';

import socket from '../socket'


const GameRoom = ({ setRenderedComp }) => {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState("");
  const [showPlayerPanel, setShowPlayerPanel] = useState(true);
  const [showChatPanel, setShowChatPanel] = useState(true);
  const [timer, setTimer] = useState(null);
  const [renderReady, setRenderReady] = useState(false);
  const [resultsPageData, setResultsPageData] = useState();

  const handlePageChange = (newpage) => {
    setPage(newpage);
  }

  const handlePlayerPanelClick = (e) => {
    e.preventDefault();
    setShowPlayerPanel((prev) => !prev);
  }

  const handleChatPanelClick = (e) => {
    e.preventDefault();
    setShowChatPanel((prev) => !prev);
  }

  useEffect(() => {
    socket.on("playersInRoom",(updatedList) => {
      setPlayers(updatedList);
    });
    socket.emit("getPlayersInRoom");

    socket.emit("getPage",(page, pageData) => {
      if(page === "turnResults" || page === "gameResults") {
        setResultsPageData(pageData);
      }
      else {
        setPage(page);
      }
    });

    socket.on("timer", (serverTime) => {
      setTimer(serverTime);
    });

    socket.on("toTurnResults", (resultsPageData) => {
      setTimer(null);
      setResultsPageData(resultsPageData);
    });

    // how to combine or distinuish turn and game results
    socket.on("toGameResults", (resultsPageData) => {
      setTimer(null);
      setResultsPageData(resultsPageData);
    })

    socket.on("toChoose", () => {
      setPage("choose");
    });

    socket.on("toWait", () => {
      setPage("wait");
    })

    socket.on("toWaitRoom", () => {
      setRenderedComp("waitroom");
    })
  }, [])

  useEffect(() => {
    if (resultsPageData){
      if (resultsPageData.option === "turn") {
        setPage("turnResults");
      }
      else if (resultsPageData.option === "game"){
        setPage("gameResults");
      }
    }
  }, [resultsPageData])

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
        <div hidden={!showPlayerPanel} className="panel playerPanel">
          <svg onClick={handlePlayerPanelClick} viewBox="0 0 35 35" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>Layer 1</title>
              <path transform="rotate(-180 15.296852111816408,16.101179122924805) " d="m6.78289,27.561183l12.272302,-11.460002l-12.272302,-11.460002a2.199337,2.05009 0 0 1 0,-2.890627l0,0a2.199337,2.05009 0 0 1 3.101065,0l13.987785,13.038571a2.001397,1.865582 0 0 1 0,2.624115l-13.987785,13.038571a2.199337,2.05009 0 0 1 -3.101065,0l0,0a2.199337,2.05009 0 0 1 0,-2.890627z"/>
            </g>
          </svg>
          <h2>players</h2>
          <div id="playerBox">
            <ScrollToBottom>
              <ul>
                {players.map((player) => <li key={player}> {player} </li>)}
              </ul>
            </ScrollToBottom>
          </div>
        </div>
        <div hidden={showPlayerPanel} className="panel playerPanel closed" onClick={handlePlayerPanelClick}></div>
      </Col>

      <Col xs={4} sm={6} xl={8} >
        {
              (page==="choose" && <ChooseSong handlePageChange={handlePageChange}/>)
          ||  (page==="wait" && <Wait handlePageChange={handlePageChange} />)
          ||  (page==="hint" && <HintOptions />)
          ||  (page==="guess" && <Guess />)
          ||  (page==="turnResults" && <Results option={resultsPageData.option} usersPoints={resultsPageData.usersPoints}/>)
          ||  (page==="gameResults" && <Results option={resultsPageData.option} usersPoints={resultsPageData.usersPoints}/>)
        }
      </Col>

      <Col xs={4} sm={3} xl={2} className="roomCol">
        <div hidden={!showChatPanel} className="panel chatPanel">
            <svg onClick={handleChatPanelClick} viewBox="0 0 35 35" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>Layer 1</title>
                <path d="m8.26687,27.561183l12.272302,-11.460002l-12.272302,-11.460002a2.199337,2.05009 0 0 1 0,-2.890627l0,0a2.199337,2.05009 0 0 1 3.101065,0l13.987785,13.038571a2.001397,1.865582 0 0 1 0,2.624115l-13.987785,13.038571a2.199337,2.05009 0 0 1 -3.101065,0l0,0a2.199337,2.05009 0 0 1 0,-2.890627z"/>
              </g>
            </svg>
            <h2>chat</h2>
            <Chat/>
          </div>
        <div hidden={showChatPanel} className="panel closed chatPanel" id="chatPanelClosed" onClick={handleChatPanelClick}></div>
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
