import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import SidebarUser from './SidebarUser';
import '../css/Sidebar.css';

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { getUserRooms } from '../context/apicalls';
import { UserContext } from '../context/StateProvider';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Sidebar = () => {
  const [{ user, currentRoom }, dispatch] = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

  const setCurrentRoom = (data) => {
    dispatch({
      type: 'SET_ROOM',
      payload: data
    })
  }

  useEffect(() => {
    getUserRooms(user.uid, setRooms)
  }, [])

  return (
    <div className="sidebar">
      <div className="setting__header">
        <InfoIcon />
        <h4>Chatime</h4>
        <IconButton>
          <ExitToAppIcon />
        </IconButton>
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
          <SidebarUser key={i} id={room.id} data={room.data} setCurrentRoom={setCurrentRoom} />
        ))}
      </div>
    </div>
  ) 
};

export default Sidebar;