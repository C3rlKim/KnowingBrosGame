import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/Landing.scss';
import title from '../images/gif.gif';

const Landing = () => {
	return (
		<Container fluid>
			<Row className="align-items-center landing">
				<Col xs={12} sm={4}>
					<Link to="/create">
						<Button className="roomBtn" id="createRoomBtn" variant="primary">create room</Button>
					</Link>
				</Col>
				<Col xs={12} sm={4}>
					<img alt="logo" src={title}></img>
					<h1>guess the song</h1>
				</Col>
				<Col xs={12} sm={4}>
					<Link to="/join">
						<Button className="roomBtn" id="joinRoomBtn" variant="primary">join room</Button>
					</Link>
				</Col>
			</Row>
			</Container>
	);
}

export default Landing;
