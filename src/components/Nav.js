import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import NavConversations from './NavConversations';
import '../css/Sidebar.css';

import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { getUserRooms } from '../context/apicalls';
import { UserContext } from '../context/StateProvider';
import NavHeader from './NavHeader';

const Nav = () => {
  const [{ user, currentRoomId }] = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getUserRooms(user.uid, setRooms)
  }, [])

  return (
    <div className="sidebar">
      <NavHeader />

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
        {rooms.map((room, i) => {
          if (room.id === currentRoomId) {
            return <NavConversations key={i} active={true} room={room} />
          } else {
            return <NavConversations key={i} active={false} room={room} />
          }
        })}
      </div>
    </div>
  )
};

export default Nav;