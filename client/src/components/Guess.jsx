import React, { useEffect, useState, useRef } from 'react';

import ReactPlayer from 'react-player';

import socket from '../socket';

const start = 30;

const Guess = (props) => {
  let { handlePageChange } = props;
  const [track, setTrack] = useState(5);
  const [playing, setPlaying] = useState(false);
  const [whichPlaying, setWhichPlaying] = useState(0); //number of seconds of the snippet hint
  const playerRef = useRef(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    socket.emit("getSelectedSong");

    socket.on("selectedSong", (track) => {
      console.log("changed track",  track);
      setTrack(track);
    });;

    socket.on("playSnippet", (seconds) => {
      setWhichPlaying(seconds);
    });

    //move to results page once 1-everyone guesses right, 2-timer runs out
    // socket.on("---", () => {
    //   handlePageChange("---");
    // })
  }, []);

  //update 'playing' last so it's not overidden by async updates to other states
  useEffect(() => {
    if (whichPlaying === 0) {
      if (playing) setPlaying(false);
    }
    else {
      playerRef.current.seekTo(start);
      if (!playing) setPlaying(true);
    }
  }, [whichPlaying]);

  // Latency issues (progressInterval is at 500ms right now)
  const handleProgress = (progress) => {
    console.log("progress", progress);
    if ((progress.playedSeconds - start) >= whichPlaying) {
      console.log("hit");
      setWhichPlaying(0);
    }
  }

  //force react player rerender with new start_track when track changes
  useEffect(() => {
    console.log("useeffect key", key);
    setKey(key+1);
  }, [track]);

  return (
    <div>
      <h1>guess the song</h1>
      <p>send your guesses in the chat</p>

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
