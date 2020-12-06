import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Create from './components/Create';
import Join from './components/Join';
import WaitingRoom from './components/WaitingRoom';
import ChooseSong from './components/ChooseSong';
import Guess from './components/Guess';
import Results from './components/Results';
import Chat from './components/Chat';

const App = () => (
	<Router>
		<Route path="/" exact>
			<Landing/>
		</Route>
    <Route path="/create">
			<Create/>
		</Route>
    <Route path="/join">
			<Join/>
		</Route>
    <Route path="/waitroom">
			<WaitingRoom/>
		</Route>
    <Route path="/choose">
			<ChooseSong/>
		</Route>
    <Route path="/guess">
			<Guess/>
		</Route>
    <Route path="/results">
			<Results/>
		</Route>
		// temporarily before adding component with other ones
    <Route path="/chat">
			<Chat/>
		</Route>
	</Router>
);

export default App;
