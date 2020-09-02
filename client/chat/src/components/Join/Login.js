// Join view
import React, {useState} from 'react';

import './Join.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => dispatch({
            type: actionTypes.SET_USER,
            user: result.user
        }))
        .catch(error => console.log('no'));
    };
    
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <button className={'button mt-20'} type="submit" onClick={signIn}>Sign In</button>
            </div>
        </div>
    )
}

export default Login;