import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Results from './Results';
import ChooseSong from './ChooseSong';
import Guess from './Guess';
import Wait from './Wait';
import Chat from './Chat';

const Room = () => {
	let isJudge = true; //add logic to determine whether judge or guesser
	let activated = false; //set to false right now to prevent constant polling

	const [page, setPage] = useState("choose");

	const handler = (newpage) => {
    setPage(newpage);
  }

	const Page = () => {
		if (isJudge) {
			if (page === "choose") return <ChooseSong handler={handler} />;
			if (page === "wait") return <Wait isJudge={isJudge} handler={handler} />
		}
    else {
    	if (page === "wait") return <Wait isJudge={isJudge} handler={handler} />;
    	if (page === "guess") return <Guess handler={handler} />;
    }
    return <Results handler={handler} />;
  }

	return (
		<div>
			<Container>
          <Row>
            <Col xs={12} md={6} lg={9}>
              <Page />
            </Col>
            {activated &&
            	<Col xs={12} md={6} lg={3}>
	             	<Chat />
	            </Col>
	          }
          </Row>
        </Container>
		</div>
	);
}

export default Room;