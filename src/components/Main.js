import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../css/Chat.css';
import Chat from './Chat';
import Sidebar from './Sidebar'
import Start from './Start';
import Join from './Join';

const Main = () => {
    return (
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/room" component={Chat} />
            <Route path="/start" component={Start} />
            <Route path="/join" component={Join} />
            <Route exact path="/" component={Join} />
          </Switch>
        </Router>
    )
}

export default Main;