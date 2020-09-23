// Check Room View
import React, { useState, useEffect } from 'react';
import db from '../context/firebase';
import { Avatar } from '@material-ui/core';

const Modal = ({ room, modal, setModal }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (modal === "Requests") {
            // Check if user has sent request. If yes, setRquest true
            db.collection('rooms').doc(room).collection('requests')
            .onSnapshot(snapshot => setUsers(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            )

        } else if (modal === "Members") {
            db.collection('rooms').doc(room).collection('members')
            .onSnapshot(snapshot => setUsers(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            )
        }
    }, [modal]);

    const kick = (user) => {
        db.collection('rooms').doc(room).collection('members').doc(user.id).delete();

        // Remove from user's rooms
        /* db.collection('users').doc(user.data.uid).update({
            rooms: firebase.firestore.FieldValue.arrayRemove(room)
        }) */
    }

    const accept = (user) => {
        db.collection('rooms').doc(room).collection('members').add({
            name: user.data.name,
            uid: user.data.uid
        })

        db.collection('rooms').doc(room).collection('requests').doc(user.id).delete();

        // Add to user's rooms
        /* db.collection('users').doc(user.data.uid).update({
            rooms: firebase.firestore.FieldValue.arrayUnion(room)
        }) */
    }
    
    return (
        <div className="room wrapper sidebar_users">
            <h3>{modal}</h3>
            <button onClick={() => setModal(false)}>Close</button>
            {users.map(user => (
                <div key={user.id} className="sidebarUser">
                    <Avatar />
                    <div className="sidebarUser_name">
                        <h2>{user.data.name}</h2>
                    </div>
                    {modal === "Requests" ? (<button onClick={() => accept(user)}>Accept</button>) : (
                        <button onClick={e => kick(user)}>Kick</button>
                    )}
                </div>
            ))}
        </div>
        
    )
}

export default Modal;