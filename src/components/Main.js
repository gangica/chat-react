import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../css/Chat.css';
import Chat from './Chat';
import Nav from './Nav'
import Create from './Create';
import Join from './Join';

const Main = () => {
  return (
    <div className="app_body">
      <Router>
        <Nav />
        <Switch>
          <Route path="/room" component={Chat} />
          <Route path="/start" component={Create} />
          <Route path="/join" component={Join} />
          <Route exact path="/" component={Join} />
        </Switch>
      </Router>
    </div>
  )
}

export default Main;