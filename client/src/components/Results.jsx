import React from 'react';

const Results = ({ option, usersPoints }) => {
  const results = usersPoints.map((userPointsObj, idx) => {
    return <li key={idx}>{userPointsObj.userName} {userPointsObj.points}</li>
  });

  return (
    <div>
      <h2>{option==="turn" ? "Turn Results" : "Game Results"}</h2>
      <div>{results}</div>
    </div>
  );
}

export default Results;
