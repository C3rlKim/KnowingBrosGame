import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Create from './components/Create';
import Join from './components/Join';
import WaitingRoom from './components/WaitingRoom';
import Room from './components/Room';
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
    <Route path="/room">
      <Room/>
    </Route>
    <Route path="/chat">
      <Chat/>
    </Route>
  </Router>
);

export default App;
