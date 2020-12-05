import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Join = () => {
	return (
		<div>
			<h1>join room</h1>
			<Form>
				<Form.Group>
					<Form.Label>ROOM NAME</Form.Label>
					<Form.Control placeholder="Tommy Trojan"></Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>YOUR NAME</Form.Label>
					<Form.Control placeholder="Nefarious Nayeon"></Form.Control>
				</Form.Group>
			</Form>
			<Button type="submit">submit</Button>
			<a href="/create">actually, I want to create a room</a>
		</div>
	);
}

export default Join;