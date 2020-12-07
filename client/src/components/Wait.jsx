import React from 'react'

const Wait = (props) => {
	const {isJudge, handler} = props;

	return (
		{isJudge}
			? <p>waiting for players to make their guess</p>
			: <p>waiting for judge to choose song</p>
	);
}

export default Wait;