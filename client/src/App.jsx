import React, { useState } from 'react';

import Landing from './components/Landing';
import CreateJoin from './components/CreateJoin';
import WaitRoom from './components/WaitRoom';
import GameRoom from './components/GameRoom';

const App = () => {
  const [renderedComp, setRenderedComp] = useState("landing");

  return (
    <div>
      {
            (renderedComp==="landing" && <Landing setRenderedComp={setRenderedComp}/>)
        ||  (renderedComp==="create" && <CreateJoin option="create" setRenderedComp={setRenderedComp}/>)
        ||  (renderedComp==="join" && <CreateJoin option="join" setRenderedComp={setRenderedComp}/>)
        ||  (renderedComp==="waitroom" && <WaitRoom setRenderedComp={setRenderedComp}/>)
        ||  (renderedComp==="gameroom" && <GameRoom setRenderedComp={setRenderedComp}/>)
      }
    </div>
  );
}

export default App;
