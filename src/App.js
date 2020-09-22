import React, { useContext } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Login from './components/Join/Login';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Join from './components/Join';
import { UserContext } from './context/StateProvider';
import Start from './components/Start';

const App = () => {
  const [{ user }] = useContext(UserContext);

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
              <Route path="/start">
                <Start />
              </Route>
              <Route exact path="/">
                <Start />
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