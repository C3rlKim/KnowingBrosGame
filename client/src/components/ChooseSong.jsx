import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import ReactPlayer from 'react-player/soundcloud';
import MainButton from './MainButton';

import socket from '../socket';

const Choose = (props) => {
  const { handlePageChange } = props;
  const [titles, setTitles] = useState(null);
  const [value, setValue] = useState("choose a song");
  const [trackNum, setTrackNum] = useState(0);
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getPlaylist() {
      try {
        const response = await fetch(
          "https://api.soundcloud.com/playlists/1152826654?client_id=d02c42795f3bcac39f84eee0ae384b00"
        );

        const json = await response.json();
        json.tracks.unshift({title: "choose a song"});
        setTitles(json.tracks.map((track,idx) => {
          return (
            <option disabled={idx === 0 ? true : false} key={idx}>{track.title}</option>
          );
        }));
      }
      catch (error) {
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
    if (trackNum === 0) setErrorMsg("Invalid song choice");
    else if (answer.length === 0) setErrorMsg("Fill in an answer");
    else {
      socket.emit("songSelected", trackNum-1, answer, () => {
        handlePageChange("hint");
      });
    }
  }

  const handleAlertClose = () => {
    setErrorMsg(null);
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
        <Form.Control className="formInput" type="text" value={answer} onChange={handleAnswerChange} placeholder="explicit answer here ..."/>

        {
          errorMsg &&
          <Alert variant="danger" onClose={handleAlertClose} dismissible>{errorMsg}</Alert>
        }

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
