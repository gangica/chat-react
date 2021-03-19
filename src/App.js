import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Login';
import Main from './components/Main';
import { UserContext } from './context/StateProvider';
import { auth } from './context/firebase';
import "./App.css";

const App = () => {
  const [{ user }, dispatch] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
      auth.onAuthStateChanged(currentUser => {
        if (currentUser) {
          dispatch({
            type: 'SET_USER',
            payload: currentUser
          })
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      })
  }, [])

  return (
    <div className="app">
      <div className="app_body">
          {isLoggedIn ? <Main /> : <Login />}
      </div>
    </div>
  )
};

export default App;