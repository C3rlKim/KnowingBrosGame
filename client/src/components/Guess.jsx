import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Guess = () => {
  // useEffect(() => {
  // 	const timer = setTimeout(() => {
  // 		console.log(document.querySelectorAll('.ao.ap.ds.b3.bs.bu.bt.dt'));
	 //    console.log(Array.from(document.querySelectorAll('.ao.ap.ds.b3.bs.bu.bt.dt')).find(el => el.textContent === "Aloha"));
	 //    //can't use ref because iframe blocks cross origin access
	 //    //Array.from(document.querySelectorAll('.ao.ap.ds.b3.bs.bu.bt.dt')).find(el => el.textContent === "Aloha");

	 //  }, 5000);
	 //  return () => clearTimeout(timer);
  // }, [])

	return (
		<div>
			<h1>ROUND 1</h1>
			<h1>one second snippet</h1>
			<p>0:58 min remaining</p>

			<Form>
				<Form.Group>
					<Form.Label>SONG ARTIST</Form.Label>
					<Form.Control placeholder="twice"></Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>SONG TITLE</Form.Label>
					<Form.Control placeholder="what is love?"></Form.Control>
				</Form.Group>

				<Button type="submit">submit</Button>
				<Button>leave game</Button>
			</Form>

			<p>invalid song choice</p>
			<p>check spelling of artist or title</p>

			<iframe
				title="playlist"
				src="https://open.spotify.com/embed/playlist/5xl6pngUNTpJkMEcgq70an"
				width="300"
				height="380"
				frameBorder="0"
				allowtransparency="true"
				allow="encrypted-media">
			</iframe>
		</div>
	);
}

export default Guess;
