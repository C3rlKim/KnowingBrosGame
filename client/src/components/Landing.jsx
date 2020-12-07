import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Landing = () => {
	return (
		<div>
			<h1>guess the song</h1>
			<Link to="/create">
				<Button variant="primary">create room</Button>
			</Link>
			<Link to="/join">
				<Button variant="primary">join room</Button>
			</Link>
		</div>
	);
}

export default Landing;
