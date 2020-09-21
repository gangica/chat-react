import React, {useState} from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';
import db, { auth, provider } from '../context/firebase';
import firebase from 'firebase';

import '../css/Chat.css';

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        // auth.setPersistence(auth.Auth.Persistence.SESSION);
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
        <div className="chat_body main">
            <div className="login">
                <h1>Chatime</h1>
                <p>Join rooms to chat with your friends</p>
                <button className="send" type="submit" onClick={signIn}>Sign In</button>
            </div>
        </div>
    )
}

export default Login;