import React from 'react';
import '../css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ChatHeader = ({ room, chatInfo, setChatInfo }) => {
    const { name, photo } = room.data;

    return (
        <div className="chat_header">
            <Avatar src={photo && photo} />
            <div className="chat_headerInfo">
                <h4>{name}</h4>
            </div>
            <IconButton onClick={() => setChatInfo(!chatInfo)}>
                <MoreVertIcon />
            </IconButton>
        </div>
    )
}

export default ChatHeader;