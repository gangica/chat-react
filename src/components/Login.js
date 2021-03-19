import React, { useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import db, { auth, provider } from '../context/firebase';
import firebase from 'firebase';

import '../css/Chat.css';

const Login = () => {
    const [{ user }, dispatch] = useContext(UserContext);

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
                        photoURL: result.user.photoURL,
                        rooms: [],
                        lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()                    
                    })
                }
            });
            
            dispatch({
                type: 'SET_USER',
                payload: result.user
            });
        })
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