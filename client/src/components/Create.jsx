import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Create = () => {
	return (
		<div>
			<h1>create room</h1>
			<Form>
				<Form.Label>ROOM NAME</Form.Label>
				<Form.Control placeholder="Tommy Trojan"></Form.Control>
				<Button type="submit">submit</Button>
				<Link to="/join">
					actually, I want to join a room
				</Link>
			</Form>
		</div>
	);
}

export default Create;
