import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import CreateJoinForm from './CreateJoinForm';
import '../style/CreateJoinWait.scss';

import socket from '../socket';

const CreateJoin = (props) => {
  const { option } = props;
  const history = useHistory();

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [spin, setSpin] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation of empty room name and your name
    if(!room || !name){
      setErrorMess("Fill in both room name and your name!");
      return;
    }

    setShowLoading(true);
    // TESTING Loader
    /*
    setTimeout(() => {
      socket.emit("validation", { name, room, option }, (status, error) => {
        if(status==="invalid"){
          setErrorMess(error);
        }
        else if(status==="waitingroom"){
          history.push("/waitroom");
        }
        else if(status==="ingame"){
          // By Pass user to the gameroom (have to implement)
          history.push("/room/" + room + "/" + name);
        }
        setShowLoading(false);
      });
    },3000);
    */
    socket.emit("validation", { name, room, option }, (status, error) => {
      if(status==="invalid"){
        setErrorMess(error);
      }
      else if(status==="waitingroom"){
        history.push("/waitroom");
      }
      else if(status==="ingame"){
        // By Pass user to the gameroom (have to implement)
        history.push("/room/" + room + "/" + name);
      }
      setShowLoading(false);
    });
  }

  const handleCloudClick = (e) => {
    setSpin(true);
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
            showLoading={showLoading}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CreateJoin;
