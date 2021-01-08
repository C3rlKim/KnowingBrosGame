import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/Landing.scss';
import title from '../images/gif.gif';

const Landing = ({ setRenderedComp }) => {

  const handleToCreateRoom = (e) => {
    setRenderedComp("create")
  }

  const handleToJoinRoom = (e) => {
    setRenderedComp("join");
  }

  return (
    <Container fluid>
      <Row className="align-items-center landing">
        <Col xs={12} sm={4}>
          <Button className="roomBtn" id="createRoomBtn" variant="primary" onClick={handleToCreateRoom}>
            create room
          </Button>
        </Col>
        <Col xs={12} sm={4}>
          <img alt="logo" src={title}></img>
          <h1>guess the song</h1>
        </Col>
        <Col xs={12} sm={4}>
          <Button className="roomBtn" id="joinRoomBtn" variant="primary"onClick={handleToJoinRoom}>
            join room
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
