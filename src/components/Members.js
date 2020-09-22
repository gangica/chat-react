// Check Room View
import React, { useState, useEffect } from 'react';
import db from '../context/firebase';
import { Avatar } from '@material-ui/core';

const Members = ({ room, openMemModal }) => {
    const [members, setMembers] = useState([]);

    const kick = (user) => {
        db.collection('rooms').doc(room).collection('members').doc(user.id).delete();

        // Remove from user's rooms
        /* db.collection('users').doc(user.data.uid).update({
            rooms: firebase.firestore.FieldValue.arrayRemove(room)
        }) */
    }
    
    useEffect(() => {
        
        db.collection('rooms').doc(room).collection('members')
        .onSnapshot(snapshot => setMembers(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )
    });

    return (
            <div className="room wrapper sidebar_users">
                <h3>Members</h3>
                <button onClick={openMemModal}>Close</button>
                {members.map(member => (
                    <div key={member.id} className="sidebarUser">
                        <Avatar />
                        <div className="sidebarUser_name">
                            <h2>{member.data.name}</h2>
                        </div>
                        <button onClick={e => kick(member)}>Kick</button>
                    </div>
                ))}
            </div>
    )
}

export default Members;