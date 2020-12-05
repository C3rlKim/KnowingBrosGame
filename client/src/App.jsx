import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from "./components/Landing"
import Create from "./components/Create"
import Join from "./components/Join"
import Wait from "./components/WaitingRoom"
import ChooseSong from "./components/ChooseSong"
import Guess from "./components/Guess"
import Results from "./components/Results"
import Foo from './components/Foo/Foo';

const App = () => (
	<Router>
		<Route path="/" exact component={Landing} />
    <Route path="/create" component={Create} />
    <Route path="/join" component={Join} />
    <Route path="/wait" component={Wait} />
    <Route path="/choose" component={ChooseSong} />
    <Route path="/guess" component={Guess} />
    <Route path="/results" component={Results} />
    <Route path="/foo" component={Foo} />
  </Router>
);

export default App;
