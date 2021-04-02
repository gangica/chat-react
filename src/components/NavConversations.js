import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getLatestMessage } from '../context/apicalls';
import '../css/SidebarUser.css';
import { Avatar } from '@material-ui/core';

const NavConversations = ({ active, room }) => {
  const [message, setMessage] = useState([]);

  const renderMessage = () => {
    if (!message) {
      return `Welcome to ${room.data.name}`
    }

    switch (message.type) {
      case 'image':
        return `${message.author.name} sent a photo`
      
      default:
        return message.content
    }
  }

  useEffect(() => {
    getLatestMessage(room.id, setMessage);
  }, [])

  return (
    <Link to={{ pathname: '/room', state: { id: room.id }}}>
      <div className={active ? "sidebarUser active" : "sidebarUser"}>
        <Avatar src={room.data.photo && room.data.photo} />
        <div className="sidebarUser_name">
          <h2>{room.data.name}</h2>
          <div className="last__message">
            <p>{renderMessage()}</p>
            <p>{message && new Date(message.timestamp?.toDate())
            .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</p>
          </div>
        </div>
      </div>
    </Link>

  )
};

export default NavConversations;