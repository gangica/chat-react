import React from 'react';
import './ChatApp.css';
import { Avatar, IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ChatApp = () => (
  <div className="chat">
      <div className="chat_header">
           <Avatar />
           <div className="chat_headerInfo">
               <h3>Room 1345</h3>
               <p>Last seen at ...</p>
           </div>
           <IconButton>
                <ExitToAppIcon />
           </IconButton>
           <IconButton>
                <MoreVertIcon />
           </IconButton>
      </div>

      <div className="chat_body">
          <p className="chat_message">
              <span className="chat_name">Jerry</span>
              Hay lam dmm
              <span className="timestamp">21:17</span>
          </p>

          <p className="chat_message chat_sender">
              Hay lam dmm
              <span className="timestamp timestamp_sender">21:17</span>
          </p>
      </div>

      <div className="chat_footer">
           <IconButton>
                <InsertEmoticonIcon />
           </IconButton>
          <form>
              <input placeholder="Type a message" type="text" />
          </form>
          <button className="send">Send</button>
      </div>
  </div>
);

export default ChatApp;