import React from 'react'
import Button from 'react-bootstrap/Button'

const Landing = () => {
	return (
		<div>
			<h1>guess the song</h1>
			<Button variant="primary" href="/create">create room</Button>
			<Button variant="primary" href="/join">join room</Button>
		</div>
	);
}

export default Landing;