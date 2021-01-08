import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import CreateJoinForm from './CreateJoinForm';
import '../style/CreateJoinWait.scss';

import socket from '../socket';

const CreateJoin = ({ option, setRenderedComp }) => {
  const [spin, setSpin] = useState(false);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [errorMess, setErrorMess] = useState("");

  const handleCloudClick = (e) => {
    setSpin(true);
  }

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation of empty room name and your name
    if(!room || !name) {
      setErrorMess("Fill in both room name and your name!");
      return;
    }

    socket.emit("validation", { name, room, option }, (status, error) => {
      if(status==="invalid") {
        setErrorMess(error);
      }
      else if(status==="waitroom") {
        setRenderedComp("waitroom");
      }
      else if (status==="gameroom") {
        setRenderedComp("gameroom");
      }
    });
  }

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
          <CreateJoinForm
            name={name}
            room={room}
            option={option}
            handleChangeName={handleChangeName}
            handleChangeRoom={handleChangeRoom}
            handleSubmit={handleSubmit}
            errorMess={errorMess}
            setErrorMess={setErrorMess}
            setRenderedComp={setRenderedComp}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CreateJoin;
