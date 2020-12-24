import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing';
import CreateJoin from './components/CreateJoin';
import WaitRoom from './components/WaitRoom';
import Room from './components/GameRoom';
import Chat from './components/Chat';

const App = () => (
  <Router>
    <Route path="/" exact>
      <Landing/>
    </Route>
    <Route path="/create">
      <CreateJoin option="create"/>
    </Route>
    <Route path="/join">
      <CreateJoin option="join"/>
    </Route>
    <Route path="/waitroom">
      <WaitRoom/>
    </Route>
    <Route path="/gameroom">
      <Room/>
    </Route>
  </Router>
);

export default App;
