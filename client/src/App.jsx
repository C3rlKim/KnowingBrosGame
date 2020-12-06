import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Create from './components/Create';
import Join from './components/Join';
import WaitingRoom from './components/WaitingRoom';
import ChooseSong from './components/ChooseSong';
import Guess from './components/Guess';
import Results from './components/Results';
import Foo from './components/Foo';

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
    <Route path="/wait">
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
    <Route path="/foo">
			<Foo/>
		</Route>
	</Router>
);

export default App;
