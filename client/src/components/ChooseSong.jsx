import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import MainButton from './MainButton';

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
        <MainButton type="submit">submit</MainButton>
        <MainButton>leave game</MainButton>

        <Form.Label className="formLabel">
          SONG SELECTION
        </Form.Label>
        <Form.Control as="select" value={value} onChange={handleChange}>
          {titles}
        </Form.Control>
        
        <Form.Label className="formLabel">
          SONG PLAYER
        </Form.Label>
        <ReactPlayer
          url="https://soundcloud.com/kaetly-rojas/sets/kpop"
          width='100%'
        />
      </Form>
    </div>
  );
}

export default Choose;
