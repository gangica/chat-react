import React from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarUser from './SidebarUser/SidebarUser';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Sidebar = ({ name }) => (
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
          <SidebarUser />
          <SidebarUser />
          <SidebarUser />
          <SidebarUser />
      </div>
  </div>
);

export default Sidebar;