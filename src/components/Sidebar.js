import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../context/firebase';

import SidebarUser from './SidebarUser';
import '../css/Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';

const Sidebar = ({ name }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => setRooms(
      snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    )
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="username">
          {name}
        </div>
        <Link to="/start">
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Link>
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