// Check Room View
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import db from '../context/firebase';

const Join = ({ location }) => {
    const [{ user }] = useContext(UserContext);
    const [request, setRequest] = useState(false);
    
    useEffect(() => {
        // Check if user has sent request. If yes, setRquest true
        if (location.state.room) {
            db.collection('rooms').doc(location.state.room).collection('requests')
                .onSnapshot(snapshot => snapshot.docs.map(doc => doc.data().uid === user.uid && setRequest(true)))
        }
    });

    const joinRoom = () => {
        if (location.state.room) {
            db.collection('rooms').doc(location.state.room).collection('requests').add({
                name: user.displayName,
                uid: user.uid
            })
            setRequest(true);
        }
    }

    return ( 
        <div className="chat_body join">
            <div className="room wrapper">
                <h1>Send Join Request</h1>
                { request ? (<button
                    className="send join_send">Request sent</button>) : (
                <button
                    className="send"
                    type="submit"
                    onClick={joinRoom}>Join</button>)}
            </div>
        </div>
    )
}

export default Join;