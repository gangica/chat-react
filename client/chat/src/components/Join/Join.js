// Check Room View
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import Chat from '../Chat/Chat';
import { useStateValue } from '../../StateProvider';

const Join = () => {
    const [{ user }, dispatch] = useStateValue();
    const { roomId } = useParams();
    const [redirect, setRedirect] = useState(false);

    const joinRoom = () => {
        db.collection('users').doc(user.uid).update({
            rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
        })
        setRedirect(true);
    }

    return (
        redirect ? (<Chat />) : (
        <div className="chat">
            <button
                className="send"
                type="submit"
                onClick={joinRoom}>Join</button>
        </div>
    ))
}

export default Join;