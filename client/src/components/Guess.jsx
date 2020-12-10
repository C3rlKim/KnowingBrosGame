import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import MainButton from './MainButton';

const start = 10;

const Guess = (props) => {
  let {handler, trackNumber} = props;
  trackNumber = 0;//hardcode prop
  const [playing, setPlaying] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count10, setCount10] = useState(0);
  const [whichPlaying, setWhichPlaying] = useState(0);
  const [max, setMax] = useState(0);
  const playerRef = useRef(null);

  //use effect hook to execute sequentially so 'playing' is updated last
  //and not overidden by async updates
  useEffect(() => {
    if (whichPlaying === 0) { 
      setPlaying(false);
    }
    else {
      playerRef.current.player.seekTo(start);
      setPlaying(true);
    }
    if (whichPlaying === 1) { setCount1(count1+1); }
    else if (whichPlaying === 5) { setCount5(count5+1); }
    else if (whichPlaying === 10) { setCount10(count10+1); }
  }, [whichPlaying])

  useEffect(() => {
    let temp = 0;
    if (count1 > 0) temp = 1;
    if (count5 > 0) temp = 5;
    if (count10 > 0) temp = 10;
    if (temp > 0) setPlaying(true);
    setMax(temp);
  }, [count1, count5, count10])

  const handlePlay1sec = () => {
    setWhichPlaying(1);
  }
  const handlePlay5sec = () => {
    setWhichPlaying(5);
  }
  const handlePlay10sec = () => {
    setWhichPlaying(10);
  }

  const handleProgress = (progress) => {
    console.log("pro", progress);
    if ((progress.playedSeconds - start) >= whichPlaying) {
      console.log("hit");
      setWhichPlaying(0);
    }
  }

  return (
    <div>
      <h1>guess the song</h1>
      <p>you can play each snippet up to 3 times. you will get more points if you rely on shorter snippets</p>

      <MainButton
        disabled={(count1 >= 3) || (whichPlaying !== 0)}
        onClick={handlePlay1sec}
      >
        Play 1 sec
      </MainButton>

      <MainButton
        disabled={(count5 >= 3) || (whichPlaying !== 0)}
        onClick={handlePlay5sec}
      >
        Play 5 sec
      </MainButton>

      <MainButton
        disabled={(count10 >= 3) || (whichPlaying !== 0)}
        onClick={handlePlay10sec}
      >
       Play 10 sec
      </MainButton>

      <Form>
        <Form.Group>
          <Form.Label className="formLabel">SONG ARTIST</Form.Label>
          <Form.Control placeholder="twice"></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label className="formLabel">SONG TITLE</Form.Label>
          <Form.Control placeholder="what is love?"></Form.Control>
        </Form.Group>

        <MainButton type="submit">submit</MainButton>
        <Link to={{pathname: "/"}}>
          <MainButton>leave game</MainButton>
        </Link>
      </Form>

      <p className="errorTxt">invalid song choice</p>
      <p className="errorTxt">check spelling of artist or title</p>

      <ReactPlayer
        hidden
        ref={playerRef}
        url="https://soundcloud.com/kaetly-rojas/sets/kpop" 
        playing={playing}
        config={{
          soundcloud: {
            options: { start_track: trackNumber }
          }
        }}
        width="100%"
        height="100%"
        onProgress={handleProgress}
      />
      
    </div>
  );
}

export default Guess;
