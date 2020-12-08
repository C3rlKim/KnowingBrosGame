import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Create = () => {
  const [room, setRoom] = useState("Tommy Trojan");

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //send room to server, create connection
  }

  return (
    <div>
      <h1>create room</h1>
      <Form>
        <Form.Label>ROOM NAME</Form.Label>
        <Form.Control value={room} onChange={handleChangeRoom}></Form.Control>
        <Button type="submit" onSubmit={handleSubmit}>submit</Button>
        <Link to="/join">
          actually, I want to join a room
        </Link>
      </Form>
    </div>
  );
}

export default Create;
