import React from 'react';
import { Link } from 'react-router-dom';
import MainButton from './MainButton';

const Wait = (props) => {
  const {isJudge, handler} = props;

  return (
    <div>
      {isJudge
        ? <p>waiting for players to make their guess</p>
        : <p>waiting for judge to choose song</p>
      }
      <Link to={{pathname: "/"}}>
        <MainButton>leave game</MainButton>
      </Link>
      </div>
  );
}

export default Wait;