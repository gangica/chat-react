import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../css/SidebarUser.css';
import { Avatar } from '@material-ui/core';
import { getLatestMessage } from '../context/apicalls';

const SidebarUser = ({ id, data, setCurrentRoom }) => {
  const [message, setMessage] = useState([]);

  const renderMessage = () => {
    if (!message) {
      return `Welcome to ${data.name}`
    }

    switch (message.type) {
      case 'image':
        return `${message.author.name} sent a photo`
      
      default:
        return message.content
    }
  }

  useEffect(() => {
    getLatestMessage(id, setMessage);
  }, [])

  return (
    <Link to={{ pathname: '/room', state: { id: id }}} onClick={() => setCurrentRoom(data)}>
      <div className="sidebarUser">
        <Avatar src={data.photo && data.photo} />
        <div className="sidebarUser_name">
          <h2>{data.name}</h2>
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

export default SidebarUser;