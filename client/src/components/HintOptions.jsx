import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MainButton from './MainButton';
import RecordButton from '../images/record.svg';
import StopButton from '../images/stop.svg';

import socket from '../socket';

const HintOptions = () => {
  const handlePlaySnippet = (seconds, e) => {
    e.preventDefault();
    //emit to guessers
    socket.emit("playSnippetClicked", seconds);
  }

  const {
    error,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const handleSend = () => {
    if (mediaBlobUrl) {
      //emit in chat
      socket.emit("sendMessage", { mediaBlobUrl }, () => {
        // socket.io acknowledgement
        //clear recording error
      });
    }
  }

  return(
    <Container fluid>
      <h1>Send a hint</h1>

      <Row>
        <Col xs={12} lg={4} className="hint">
          <h3>Play a short snippet</h3>
          <MainButton onClick={(e) => handlePlaySnippet(1, e)}>
            Play 1 sec
          </MainButton>

          <MainButton onClick={(e) => handlePlaySnippet(3, e)}>
            Play 3 sec
          </MainButton>

          <MainButton onClick={(e) => handlePlaySnippet(5, e)}>
           Play 5 sec
          </MainButton>
        </Col>

        <Col xs={12} lg={4} className="hint">
          <h3>Mix three tracks</h3>
        </Col>

        <Col xs={12} lg={4} className="hint">
          <h3>Send a voice message to the chat</h3>
          <input type="image" onClick={startRecording} src={RecordButton} alt="start recording button" />
          <input type="image" onClick={stopRecording} src={StopButton} alt="stop recording button" />
          <audio src={mediaBlobUrl} controls />
          <button onClick={handleSend}>send</button>
          { error && <p>{error}</p> }
        </Col>

      </Row>
    </Container>
  );
}

export default HintOptions;
