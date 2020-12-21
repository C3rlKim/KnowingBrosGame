import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing';
import CreateJoin from './components/CreateJoin';
import WaitingRoom from './components/WaitingRoom';
import Room from './components/Room';
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
