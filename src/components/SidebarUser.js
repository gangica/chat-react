import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../context/firebase';

import '../css/SidebarUser.css';
import { Avatar } from '@material-ui/core';

const SidebarUser = ({ id, name }) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id)
      .collection('messages').orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => 
        setMessage(snapshot.docs[0]?.data().message));
    }
  }, [id]);

  return (
    <Link to={`/room/${id}`}>
      <div className="sidebarUser">
        <Avatar />
        <div className="sidebarUser_name">
          <h2>{name}</h2>
          <p>{message}</p>
        </div>
      </div>
    </Link>

  )
};

export default SidebarUser;