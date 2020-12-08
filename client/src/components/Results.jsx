import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const answer = "Song: Twice - What is Love?";

const hardcodedResponses = [{
  name:"Nefarious Nayeon", song:"Blackpink - Kill This Love", time:"1 sec"},
  {name:"Picky Piglet", song:"Twice - Fancy", time:"10 sec"},
  {name:"Eerie Eeyore", song:"Twice - What is Love?", time:"5 sec"
}];

const playerAnswers = hardcodedResponses.map((response) => {
  return (
    <div key={response.name}>
      <p>{response.name}</p>
      <p>{response.song}</p>
      <p>{response.time}</p>
    </div>
  );
});

const Results = (props) => {
  const {handler} = props;
  
  return (
    <div>
      <h1>{answer}</h1>

      <div>
        {playerAnswers}
      </div>

      <Table striped hover>

        <thead>
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

      <Button>leave game</Button>
    </div>
  );
}

export default Results;
