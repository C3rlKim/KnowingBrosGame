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
  const [whichPlaying, setWhichPlaying] = useState(0);
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
  }, [whichPlaying]);

  const handlePlay1sec = () => {
    setWhichPlaying(1);
  }
  const handlePlay5sec = () => {
    setWhichPlaying(5);
  }
  const handlePlay10sec = () => {
    setWhichPlaying(10);
  }
  // Latency issues
  const handleProgress = (progress) => {
    console.log("progress", progress);
    if ((progress.playedSeconds - start) >= whichPlaying) {
      console.log("hit");
      setWhichPlaying(0);
    }
  }

  return (
    <div>
      <h1>guess the song</h1>

      <MainButton
        onClick={handlePlay1sec}
      >
        Play 1 sec
      </MainButton>

      <MainButton
        onClick={handlePlay5sec}
      >
        Play 5 sec
      </MainButton>

      <MainButton
        onClick={handlePlay10sec}
      >
       Play 10 sec
      </MainButton>

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
