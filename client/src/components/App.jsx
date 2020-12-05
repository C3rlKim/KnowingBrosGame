import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from "./Landing"
import Create from "./Create"
import Join from "./Join"
import Wait from "./WaitingRoom"
import ChooseSong from "./ChooseSong"
import Guess from "./Guess"
import Results from "./Results"
console.log(Landing);
const App = () => (
	<Router>
		<Route path="/" exact component={Landing} />
    <Route path="/create" component={Create} />
    <Route path="/join" component={Join} />
    <Route path="/wait" component={Wait} />
    <Route path="/choose" component={ChooseSong} />
    <Route path="/guess" component={Guess} />
    <Route path="/results" component={Results} />
  </Router>
);

export default App;
