import React from 'react';
import './SidebarUser.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SidebarUser = ({ id, name }) => (
  <Link to={`/room/${id}`}>
    <div className="sidebarUser">
      <Avatar />
      <div className="sidebarUser_name">
        <h2>{name}</h2>
        <p>Something else...</p>
      </div>
    </div>
  </Link>
  
);

export default SidebarUser;