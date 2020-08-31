import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import './AppChat.css';
import ChatApp from './components/Chat/ChatApp';

const AppChat = () => (
  <div className="app">
      <div className="app_body">
        <Sidebar />
        <ChatApp />
      </div>
  </div>
);

export default AppChat;