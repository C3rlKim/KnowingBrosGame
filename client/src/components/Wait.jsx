import React from 'react';
import { Link } from 'react-router-dom';
import MainButton from './MainButton';

const Wait = (props) => {
  const { handlePageChange} = props;

  return (
    <div>
      <p>waiting for judge to choose song</p>
    </div>
  );
}

export default Wait;
