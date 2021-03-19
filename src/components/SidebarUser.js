import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../context/firebase';

import '../css/SidebarUser.css';
import { Avatar } from '@material-ui/core';
import { getLatestMessage } from '../context/apicalls';

const SidebarUser = ({ id, name, photo }) => {
  const [message, setMessage] = useState([]);
  const [action, setAction] = useState();

  useEffect(() => {
    getLatestMessage(id, setMessage);
  }, [])

  useEffect(() => {
    if (message) {
      if (message.type === "image") {
        setAction(`${message.name} sent a photo`)
      }
    } else {
      setAction(`Welcome to ${name}`)
    }
  }, [message])

  return (
    <Link to={{ pathname: '/room', state: { id: id }}}>
      <div className="sidebarUser">
        <Avatar src={photo && photo} />
        <div className="sidebarUser_name">
          <h2>{name}</h2>
          <div className="last__message">
            <p>{action ? action : (message && message.message)}</p>
            <p>{message && new Date(message.timestamp?.toDate())
            .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</p>
          </div>
        </div>
      </div>
    </Link>

  )
};

export default SidebarUser;