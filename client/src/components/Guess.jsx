import React, { useEffect, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'

const start = 10;

const Guess = (trackNumber) => {	
  // useEffect(() => {
  // 	const timer = setTimeout(() => {
  // 		console.log(document.querySelectorAll('.ao.ap.ds.b3.bs.bu.bt.dt'));
	 //    console.log(Array.from(document.querySelectorAll('.ao.ap.ds.b3.bs.bu.bt.dt')).find(el => el.textContent === "Aloha"));
	 //    //can't use ref because iframe blocks cross origin access
	 //    //Array.from(document.querySelectorAll('.ao.ap.ds.b3.bs.bu.bt.dt')).find(el => el.textContent === "Aloha");

	 //  }, 5000);
	 //  return () => clearTimeout(timer);
  // }, [])
  trackNumber = 0;//hardcode prop
  const [playing, setPlaying] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count10, setCount10] = useState(0);
  const [whichPlaying, setWhichPlaying] = useState(0);
  const [max, setMax] = useState(0);
  const playerRef = useRef(null);

  //on mount seek to start
  useEffect(() => {
  	playerRef.current.player.seekTo(start);
  }, [playerRef])

  //use effect hook to execute sequentially so 'playing' is updated last
  //and not overidden by async updates
  useEffect(() => {
  	if (whichPlaying === 0) { 
  		setPlaying(false);
  		if (playerRef) playerRef.current.player.seekTo(start);
  	}
  	else {
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

  const handleProgress = (duration) => {
  	console.log("pro", duration);
  	if ((duration.playedSeconds - start) >= whichPlaying) {
  		console.log("hit");
  		setWhichPlaying(0);
  	}
  }

	return (
		<div>
			<h1>guess the song</h1>
			<p>you can play each snippet up to 3 times. you will get more points if you rely on shorter snippets</p>

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
        width='100%'
        height='100%'
        onProgress={handleProgress}
      />
      <Button disabled={(count1 >= 3) || (whichPlaying !== 0)} onClick={handlePlay1sec}>Play 1 sec</Button>
      <Button disabled={(count5 >= 3) || (whichPlaying !== 0)} onClick={handlePlay5sec}>Play 5 sec</Button>
      <Button disabled={(count10 >= 3) || (whichPlaying !== 0)} onClick={handlePlay10sec}>Play 10 sec</Button>
		</div>
	);
}

export default Guess;