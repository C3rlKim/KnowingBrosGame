import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import AccentButton from './AccentButton';

const CreateJoinForm = ({ name, room, option, handleChangeName, handleChangeRoom, handleSubmit, errorMess, setErrorMess, setRenderedComp })=> {
  const handleAlertClose = () => {
    setErrorMess("");
  }

  // When user is in create room but wants to go to join room (vice versa)
  const handleLink = (e) => {
    e.preventDefault();

    if(option==="create") {
      setRenderedComp("join")
    }
    else {
      setRenderedComp("create")
    }
  }

  return (
    <div>
      <h1>{option} room</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="formLabel">ROOM NAME</Form.Label>
          <Form.Control autoFocus value={room} onChange={handleChangeRoom} placeholder="Nefarious Nayeon">
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
      <p className="roomLink" onClick={handleLink}>
        actually, I want to {(option==="create") ? "join": "create"} a room
      </p>
    </div>
  )
}

export default CreateJoinForm;
