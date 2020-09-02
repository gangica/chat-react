import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarUser from './SidebarUser/SidebarUser';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import db from '../../firebase';

const Sidebar = ({ name }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => setRooms(
      snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })
      )));
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="username">
          {name}
        </div>
        <IconButton>
          <AddCircleIcon />
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