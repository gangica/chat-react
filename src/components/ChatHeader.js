import React, { useState } from 'react';
import '../css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ChatHeader = ({ name, roomPhoto, setting, setSetting }) => {
    return (
        <div className="chat_header">
            <Avatar src={roomPhoto && roomPhoto} />
            <div className="chat_headerInfo">
                <h4>{name}</h4>
            </div>
            <IconButton onClick={() => setSetting(!setting)}>
                <MoreVertIcon />
            </IconButton>
        </div>
    )
}

export default ChatHeader;