import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Join = () => {
  const [room, setRoom] = useState("Tommy Trojan");
  const [name, setName] = useState("Nefarious Nayeon");

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //send room and name to server, establish connection
  }

  return (
    <div>
      <h1>join room</h1>
      <Form>
        <Form.Group>
          <Form.Label>ROOM NAME</Form.Label>
          <Form.Control value={room} onChange={handleChangeRoom}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>YOUR NAME</Form.Label>
          <Form.Control value={name} onChange={handleChangeName}></Form.Control>
        </Form.Group>
      </Form>
      <Button type="submit" onSubmit={handleSubmit}>submit</Button>

      <Link to="/create">
        actually, I want to create a room
      </Link>
    </div>
  );
}

export default Join;
