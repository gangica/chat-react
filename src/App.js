import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Login from './components/Join/Login';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Join from './components/Join';
import { useStateValue } from './context/StateProvider';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      <div className="app_body">
      {user
        ? (
          <Router>
            <Sidebar name={user.displayName}/>
            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route path="/join" render={props => <Join {...props} /> }>
              </Route>
              <Route exact path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        )
        : (<Login />)}
        </div>
      </div>
)};

export default App;

//  <Route path="/" exact component={Join} />