import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'

const Choose = (props) => {
	const {handler} = props;
	const [titles, setTitles] = useState(null);
	const [value, setValue] = useState("choose a song");

	useEffect(() => {
    async function getPlaylist() {
      try {
        const response = await fetch(
          //"https://api.soundcloud.com/playlists/1152826654?client_id=d02c42795f3bcac39f84eee0ae384b00"
          //keep playlist short for now
          "https://api.soundcloud.com/playlists/405726?client_id=d02c42795f3bcac39f84eee0ae384b00"
        );

        const json = await response.json();

        let id = 0;
        setTitles(json.tracks.map((track) => {
					return (
						<option key={id++}>{track.title}</option>
					);
        }));
      } catch (error) {
        console.log("error: ", error);
      }
    }

    getPlaylist();
  }, []);

  const handleChange = (e) => {
  	setValue(e.target.value);
  }

  const handleSubmit = (e) => {
  	e.preventDefault();
  	//send value to guessers
  	handler("wait");
  }

	return (
		<div>
			<h1>you are the judge for this round!</h1>
			<h1>choose a song</h1>

			<Form onSubmit={handleSubmit}>
				<Button type="submit">submit</Button>
				<Button>leave game</Button>

				<Form.Label>SONG SELECTION</Form.Label>
				<Form.Control as="select" value={value} onChange={handleChange}>
					{titles}
				</Form.Control>
				
				<ReactPlayer
	        url="https://soundcloud.com/kaetly-rojas/sets/kpop"
	        width='100%'
      	/>
			</Form>
		</div>
	);
}

export default Choose;
