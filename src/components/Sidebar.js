import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import SidebarUser from './SidebarUser';
import '../css/Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { getUserRoomIds, getUserRooms, getA } from '../context/apicalls';
import { UserContext } from '../context/StateProvider';
import InfoIcon from '@material-ui/icons/Info';

const Sidebar = ({ name }) => {
  const [{ user }] = useContext(UserContext);
  const [roomIds, setRoomIds] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // getUserRoomIds(user.uid, setRoomIds)
  }, [])

  useEffect(() => {
    getUserRooms(roomIds, setRooms)
  }, [roomIds])

  return (
    <div className="sidebar">
      <div className="setting__header">
        <InfoIcon />
        <h4>Chatime</h4>
      </div>
      <div className="profile__pic">
        <Avatar src={user.photoURL} alt="avatar" />
        <h4 className="username">{user.displayName}</h4>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search..." type="text" />
        </div>
      </div>

      <div className="conversation_header">
          <h5 className="conversation_header__title">Conversations</h5>
          <div className="conversation_action">
            <Link to="/join">
              <IconButton>
                <MeetingRoomIcon />
              </IconButton>
            </Link>
            <Link to="/start">
              <IconButton>
                <AddBoxIcon />
              </IconButton>
            </Link>
          </div>
      </div>

      <div className="sidebar_users">
        {rooms.map((room, i) => (
          <SidebarUser key={i} id={room.id} name={room.data.name} photo={room.data.photo} />
        ))}
      </div>
    </div>
  ) 
};

export default Sidebar;