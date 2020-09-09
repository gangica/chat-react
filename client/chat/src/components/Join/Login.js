// Join view
import React, {useState} from 'react';

import './Join.css';
import db, { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import firebase from 'firebase';

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            let userDoc = db.collection('users').doc(result.user.uid);
            
            // Authenticate user
            userDoc.get()
            .then(doc => {
                if (doc.exists) {
                    userDoc.update({ lastLoginTime: firebase.firestore.FieldValue.serverTimestamp() });
                } else {
                    userDoc.set({
                        name: result.user.displayName,
                        rooms: [],
                        lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()                    
                    })
                }
            });
            
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
        })
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