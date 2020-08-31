import React from 'react';
import './SidebarUser.css';
import { Avatar } from '@material-ui/core';

const SidebarUser = () => (
  <div className="sidebarUser">
      <Avatar />
      <div className="sidebarUser_name">
          <h2>User</h2>
          <p>Something else...</p>
      </div>
  </div>
);

export default SidebarUser;