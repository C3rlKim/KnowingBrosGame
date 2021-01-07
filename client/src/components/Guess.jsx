import React, { useEffect, useState, useRef } from 'react';

import ReactPlayer from 'react-player';

import socket from '../socket';

const start = 30;

const Guess = (props) => {
  let { handlePageChange } = props;
  const [track, setTrack] = useState(5);
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); //number of seconds of the snippet hint
  const [seconds, setSeconds] = useState(0);
  const [key, setKey] = useState(-1);
  const [preparationMsg, setPreparationMsg] = useState("");
  const [countdown, setCountdown] = useState(-1);
  const playerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    socket.emit("getSelectedSong");

    socket.on("selectedSong", (track) => {
      setTrack(track);
    });;

    socket.on("playSnippet", (seconds) => {
      setSeconds(seconds);
    });

    //move to results page once 1-everyone guesses right, 2-timer runs out
    // socket.on("---", () => {
    //   handlePageChange("---");
    // })
  }, []);

  useEffect(() => {
    if (seconds) setCountdown(5);
  }, [seconds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((countdown >= 0)) {
        setPreparationMsg("Prepare to listen... Playing " + seconds + "-second hint in " + countdown);
        if (countdown > 0) setCountdown(countdown - 1);
        else if (countdown === 0) setIsPlaying(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  //update 'playing' last so it's not overidden by async updates to other states
  useEffect(() => {
    if (!isPlaying) {
      if (playing) {
        setPlaying(false);
        setPreparationMsg("");
      }
    }
    else {
      playerRef.current.seekTo(start);
      if (!playing) setPlaying(true);
    }
  }, [isPlaying]);

  // Latency issues (progressInterval is at 500ms right now)
  const handleProgress = (progress) => {
    console.log("progress", progress);
    if ((progress.playedSeconds - start) >= seconds) {
      console.log("hit");
      setIsPlaying(false);
    }
  }

  //force react player rerender with new start_track when track changes
  useEffect(() => {
    setKey(key+1);
  }, [track]);

  return (
    <div>
      <h1>guess the song</h1>
      <p>send your guesses in the chat</p>

      <p style={{color: "orange"}}>{preparationMsg}</p>
      <ReactPlayer
        key={key}
        hidden
        ref={playerRef}
        progressInterval={500}
        url="https://soundcloud.com/kaetly-rojas/sets/kpop"
        playing={playing}
        config={{
          soundcloud: {
            options: { 
              start_track: track,
              visual: false
            }
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
