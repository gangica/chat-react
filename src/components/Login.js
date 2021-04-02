import React, { useContext } from 'react';
import firebase from 'firebase';

import { UserContext } from '../context/StateProvider';
import db, { auth, provider } from '../context/firebase';
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
        <div className="third__container">
            <img src="https://www.flaticon.com/svg/vstatic/svg/1041/1041916.svg?token=exp=1616408251~hmac=187aa66236b024dc0a3b31be23ea598f" />
            <div className="login__title">
                <h1>Chatime</h1>
                <p>Create private room to chat with friends</p>
            </div>
            <div>
                <button
                    className="medium__btn"
                    type="submit" onClick={authenticate}>Sign In with Google</button>

            </div>
        </div>
    )
}

export default Login;