import React from 'react';

import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainButton from './MainButton';

const answer = "Song: Twice - What is Love?";

const hardcodedResponses = [{
  name:"Nefarious Nayeon", song:"Blackpink - Kill This Love", time:"1 sec"},
  {name:"Picky Piglet", song:"Twice - Fancy", time:"10 sec"},
  {name:"Eerie Eeyore", song:"Twice - What is Love?", time:"5 sec"
}];

const playerAnswers = hardcodedResponses.map((response) => {
  return (
    <Col xs={12} md={6} lg={4} className="px-1" key={response.name}>
      <div className="scoreCard">
        <p>{response.name}</p>
        <p>{response.song}</p>
        <p>{response.time}</p>
      </div>
    </Col>
  );
});

const Results = (props) => {
  const {handlePageChange} = props;

  return (
    <div>
      <h1>{answer}</h1>

      <Row>
        {playerAnswers}
      </Row>

      <h3>Scoring rules</h3>
      <Table striped hover id="ruleTable">

        <thead id="tableHead">
          <tr>
            <th>guess</th>
            <th>1 sec</th>
            <th>5 sec</th>
            <th>10 sec</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>wrong</th>
            <th>+0</th>
            <th>+0</th>
            <th>+0</th>
          </tr>

          <tr>
            <th>correct artist only</th>
            <th>+5</th>
            <th>+3</th>
            <th>+1</th>
          </tr>

          <tr>
            <th>correct</th>
            <th>+15</th>
            <th>+10</th>
            <th>+5</th>
          </tr>

        </tbody>

      </Table>
    </div>
  );
}

export default Results;
