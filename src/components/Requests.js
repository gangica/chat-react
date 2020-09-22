// Check Room View
import React, { useState, useEffect } from 'react';
import db from '../context/firebase';
import { Avatar } from '@material-ui/core';

const Requests = ({ room, openReqModal }) => {
    const [requests, setRequests] = useState([]);

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
    
    useEffect(() => {
        // Check if user has sent request. If yes, setRquest true
        db.collection('rooms').doc(room).collection('requests')
        .onSnapshot(snapshot => setRequests(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )
    });

    return (
        <div className="room wrapper sidebar_users">
            <h3>Requests</h3>
            <button onClick={openReqModal}>Close</button>
            {requests.map(request => (
                <div key={request.id} className="sidebarUser">
                    <Avatar />
                    <div className="sidebarUser_name">
                        <h2>{request.data.name}</h2>
                    </div>
                    <button onClick={e => accept(request)}>Accept</button>
                </div>
            ))}
        </div>
        
    )
}

export default Requests;