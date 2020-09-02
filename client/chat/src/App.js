import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Login from './components/Join/Login';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Join/Login';
import { useStateValue } from './StateProvider';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {user
        ? (<div className="app_body">
          <Router>
            <Sidebar name={user.displayName}/>
            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>)
        : (<Login />)}
      </div>
)};

export default App;

//  <Route path="/" exact component={Join} />