import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

import AccentButton from './AccentButton';

const CreateJoinForm = ({ name, room, option, handleChangeName, handleChangeRoom, handleSubmit, errorMess, setErrorMess })=> {
  const handleAlertClose = () => {
    setErrorMess("");
  }

  return (
    <div>
      <h1>{option} room</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="formLabel">ROOM NAME</Form.Label>
          <Form.Control value={room} onChange={handleChangeRoom} placeholder="Nefarious Nayeon">
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label className="formLabel">YOUR NAME</Form.Label>
          <Form.Control value={name} onChange={handleChangeName} placeholder="Tommy Trojan">
          </Form.Control>
        </Form.Group>
        <AccentButton type="submit">
          submit
        </AccentButton>
        {
          errorMess &&
          <Alert variant="danger" onClose={handleAlertClose} dismissible>{errorMess}</Alert>
        }
      </Form>
      <Link className="roomLink" to={(option==="create") ? "/join": "/create"}>
        actually, I want to {(option==="create") ? "join": "create"} a room
      </Link>
    </div>
  )
}

export default CreateJoinForm;
