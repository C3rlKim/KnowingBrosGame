import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import AccentButton from './AccentButton';
import '../style/CreateJoinWait.scss';

const CreateJoin = (props) => {
  const { option } = props;
  const [room, setRoom] = useState("Tommy Trojan");
  const [name, setName] = useState("Nefarious Nayeon");
  const [spin, setSpin] = useState(false);

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //send room to server, create connection
  }

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

  const joinForm = (
    <div>
      <h1>join room</h1>
      <Form>
        <Form.Group>
          <Form.Label className="formLabel">ROOM NAME</Form.Label>
          <Form.Control value={room} onChange={handleChangeRoom}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label className="formLabel">YOUR NAME</Form.Label>
          <Form.Control value={name} onChange={handleChangeName}></Form.Control>
        </Form.Group>
      </Form>
      <AccentButton type="submit" onSubmit={handleSubmit}>submit</AccentButton>

      <Link className="roomLink" to="/create">
        actually, I want to create a room
      </Link>
    </div>
  );

  const createForm = (
    <div>
      <h1>create room</h1>
      <Form>
        <Form.Label className="formLabel">ROOM NAME</Form.Label>
        <Form.Control value={room} onChange={handleChangeRoom}></Form.Control>
        <AccentButton type="submit" onSubmit={handleSubmit}>submit</AccentButton>
        <Link className="roomLink" to="/join">
          actually, I want to join a room
        </Link>
      </Form>
    </div>
  );

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
          {option === true ? createForm : joinForm}
        </Col>
      </Row>
    </Container>
  );
}

export default CreateJoin;
