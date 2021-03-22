import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Login';
import Main from './components/Main';
import { UserContext } from './context/StateProvider';
import { auth } from './context/firebase';
import "./App.css";

const App = () => {
  const [{ user }, dispatch] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="app">
      {isLoading && <div className="loading">Loading</div>}
      {isLoggedIn ? <Main /> : <Login />}
    </div>
  )
};

export default App;