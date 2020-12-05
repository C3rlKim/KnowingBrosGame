import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Create = () => {
	return (
		<div>
			<h1>create room</h1>
			<Form>
				<Form.Label>ROOM NAME</Form.Label>
				<Form.Control placeholder="Tommy Trojan"></Form.Control>
				<Button type="submit">submit</Button>
				<a href="/join" >actually, I want to join a room</a>
			</Form>
		</div>
	);
}

export default Create;