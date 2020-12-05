import React from 'react'
import Button from 'react-bootstrap/Button'

const hardcodedList = ["Kelley", "Karl"]

const players = hardcodedList.map((name) => {
	return (
		<li>{name}</li>
	);
})

const WaitingRoom = () => {
	return (
		<div>
			<h1>waiting room</h1>
			<p>host will start the game one all players have joined</p>
			<p>no one will be able to join once it starts</p>
			<Button>leave game</Button>
			<h6>PLAYERS</h6>
			<ul>
				{players}
			</ul>
		</div>
	);
}

export default WaitingRoom;