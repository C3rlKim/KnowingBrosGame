import React from 'react';
import { useHistory } from 'react-router-dom';
import MainButton from './MainButton';

const Wait = (props) => {
  const {isJudge, handler} = props;
  const history = useHistory();

  const handleLeave =() => {
    //notify other players
    //return to landing page
    history.push('/');
  }

  return (
    <div>
      {isJudge
        ? <p>waiting for players to make their guess</p>
        : <p>waiting for judge to choose song</p>
      }
      <MainButton onClick={handleLeave}>leave game</MainButton>
      </div>
  );
}

export default Wait;