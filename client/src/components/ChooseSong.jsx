import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player/soundcloud';
import MainButton from './MainButton';

import socket from '../socket';

const Choose = (props) => {
  const { handlePageChange } = props;
  const [titles, setTitles] = useState(null);
  const [value, setValue] = useState(0);
  const [trackNum, setTrackNum] = useState();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function getPlaylist() {
      try {
        const response = await fetch(
          "https://api.soundcloud.com/playlists/1152826654?client_id=d02c42795f3bcac39f84eee0ae384b00"
          //keep playlist short for now
          //"https://api.soundcloud.com/playlists/405726?client_id=d02c42795f3bcac39f84eee0ae384b00"
        );

        const json = await response.json();
        setTitles(json.tracks.map((track,idx) => {
          return (
            <option key={idx}>{track.title}</option>
          );
        }));
      } catch (error) {
        console.log("error: ", error);
      }
    }

    getPlaylist();
  }, []);

  const handleValueChange = (e) => {
    setValue(e.target.value);
    setTrackNum(e.target.options.selectedIndex);
  }

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // disable user submitting placeholder or empty string
    console.log(trackNum);
    console.log(answer);
    socket.emit("songSelected", trackNum, answer, () => {
      handlePageChange("hint");
    });
  }

  return (
    <div>
      <h1>you are the judge for this round!</h1>
      <h1>choose a song</h1>

      <Form onSubmit={handleSubmit}>
        <MainButton type="submit">submit</MainButton>

        <Form.Label className="formLabel">
          SONG SELECTION
        </Form.Label>
        <Form.Control className="formDropdown" as="select" value={value} onChange={handleValueChange}>
          {titles}
        </Form.Control>

        <Form.Label className="formLabel">
          ANSWER TO GUESS
        </Form.Label>
        <Form.Control type="text" value={answer} onChange={handleAnswerChange} placeholder="explicit answer here ..."/>

        <Form.Label className="formLabel">
          SONG PLAYER
        </Form.Label>
        <ReactPlayer
          url="https://soundcloud.com/kaetly-rojas/sets/kpop"
          width='100%'
          config={{
            soundcloud: {
              options: {
                visual: false
              }
            }
          }}
        />
      </Form>
    </div>
  );
}

export default Choose;
