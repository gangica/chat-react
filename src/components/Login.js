import React, { useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import db, { auth, provider } from '../context/firebase';
import firebase from 'firebase';

import '../css/Chat.css';

const Login = () => {
    const [{ user }, dispatch] = useContext(UserContext);

    const authenticate = async () => {
        let result = await auth.signInWithPopup(provider);
        let currentUser = await db.collection('users').doc(result.user.uid).get();

        if (currentUser.exists) {
            db.collection('users').doc(result.user.uid)
            .update({ lastLoginTime: firebase.firestore.FieldValue.serverTimestamp() });
        } else {
            db.collection('users').doc(result.user.uid).set({
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                rooms: [],
                lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
            })
        }

        dispatch({
            type: 'SET_USER',
            payload: result.user
        })
    };

    return (
        <div className="room wrapper">
            <h2>Chatime</h2>
            <p>Create private room to chat with friends</p>
            <button
                className="medium__btn"
                type="submit" onClick={authenticate}>Sign In with Google</button>
        </div>
    )
}

export default Login;