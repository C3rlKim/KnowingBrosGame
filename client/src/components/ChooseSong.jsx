import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'

const hardCodedSongList = ["Jamie - Apollo 11", "B1A4 - Like a Movie", "IU - Blueming"];

const options = hardCodedSongList.map((song) => {
	return (
		<option>{song}</option>
	);
})

const Choose = () => {
	return (
		<div>
			<h1>you are the judge for this round!</h1>
			<h1>choose a song</h1>
			<Form>
				<Form.Label>SONG SELECTION</Form.Label>
				<Form.Control as="select">
					{options}
				</Form.Control>
				<Button type="submit">submit</Button>
				<Button type="submit">leave game</Button>
				<ReactPlayer
	        url="https://soundcloud.com/kaetly-rojas/sets/kpop"
      	/>
			</Form>
		</div>
	);
}

export default Choose;
