import React, { useState, useEffect, useContext } from 'react';
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
            {/* <Route path="/join" render={props => <Join {...props} />} /> */}
            <Route path="/start" component={Start} />
            <Route path="/join" component={Join} />
            <Route exact path="/" component={Start} />
          </Switch>
        </Router>
    )
}

export default Main;

/**
 * user: {name: "GIANG CAO"}
 * rooms: ["id1", "id2"]
 * 
 * ROOMS: [
 * {id: "id1", name: "Room 142", messages: [
 * {name: "J", timestamp: "20:40", message: "bro"}, {name: "K", timestamp: "20:41", message: "hello"}]}
 * ]
 * 
 */