import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import firebase from 'firebase';
import db from '../context/firebase';

import SidebarUser from './SidebarUser';
import '../css/Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';

const Sidebar = ({ name }) => {
  const [{ user }] = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

  // Create new room
  const createRoom = () => {
    const roomName = prompt("Please enter a room name");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
        admin: {
          name: user.displayName,
          uid: user.uid
        }
      }).then(room => {
        db.collection('rooms').doc(room.id).collection('members').add({
          name: user.displayName,
          uid: user.uid
        })
        db.collection('users').doc(user.uid).update({
          rooms: firebase.firestore.FieldValue.arrayUnion(room.id)
        })
      }).catch(error => console.log('no'));
    }
  }

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => setRooms(
      snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    )
  }, [])
  /* // Display only rooms that user is in
  useEffect(() => {
    db.collection('users').doc(user.uid)
      .onSnapshot(snapshot => {
        if (snapshot.data().rooms[0]) {
          db.collection('rooms').where(firebase.firestore.FieldPath.documentId(), 'in', snapshot.data().rooms)
            .onSnapshot(snapshot => setRooms(
              snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
            )
        }
      })
  }, []) */

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="username">
          {name}
        </div>
        <IconButton onClick={createRoom}>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search..." type="text" />
        </div>
      </div>

      <div className="sidebar_users">
        {rooms.map(room => (
          <SidebarUser key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  ) 
};

export default Sidebar;