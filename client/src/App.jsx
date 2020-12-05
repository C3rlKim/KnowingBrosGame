import React from 'react';

// Import react router
import { Route } from 'react-router-dom';

// Import child components
import Foo from './components/Foo/Foo';

const  App = () => {
  return (
    <Route exact path ='/Foo'>
      <Foo/>
    </Route>
  );
}

export default App;
