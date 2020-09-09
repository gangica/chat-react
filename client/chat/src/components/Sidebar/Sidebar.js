import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarUser from './SidebarUser/SidebarUser';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';

import db from '../../firebase';

const Sidebar = ({ name }) => {
  const [{ user }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [profile, setProfile] = useState([]);

  // Create new room
  const createRoom = () => {
    const roomName = prompt("Please enter a room name");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName
      }).then(room => {
        db.collection('users').doc(user.uid).update({
          rooms: firebase.firestore.FieldValue.arrayUnion(room.id)
        })
      }).catch(error => console.log('no'));
    }
  }

  // Display only rooms that user is in
  useEffect(() => {
    db.collection('users').doc(user.uid).get()
    .then(doc => doc.data().rooms)
    .then(rooms => {
      db.collection('rooms').where(firebase.firestore.FieldPath.documentId(), 'in', rooms)
      .onSnapshot(snapshot => setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      );
    })
    .catch(error => console.log('No rooms'));
  }, [{user}])

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="username">
          {name}
        </div>
        <IconButton>
          <AddCircleIcon onClick={createRoom} />
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