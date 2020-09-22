import React, { useState, useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import { Redirect } from 'react-router-dom';
import db from '../context/firebase';
import firebase from 'firebase';

const Start = () => {
    const [{ user }] = useContext(UserContext);
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const createRoom = () => {
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
                admin: {
                    name: user.displayName,
                    uid: user.uid
                }
            }).then(room => {
                setRoomId(room.id);
                db.collection('rooms').doc(room.id).collection('members').add({
                    name: user.displayName,
                    uid: user.uid
                })
                db.collection('users').doc(user.uid).update({
                    rooms: firebase.firestore.FieldValue.arrayUnion(room.id)
                })
                
            })
            .catch(error => console.log('no'));

            setRedirect(true);
        }
    }

    return ( redirect ? (<Redirect to={`/room/${roomId}`} />) : (
        <div className="chat_body join">
            <div className="room wrapper">
                <h1>Enter a room name</h1>
                <input className="input-data" placeholder="Type a message" type="text" onChange={e => setRoomName(e.target.value)}></input>
                <button
                    className="send"
                    type="submit"
                    onClick={createRoom}>Start</button>
            </div>
        </div>
    ))
}

export default Start;