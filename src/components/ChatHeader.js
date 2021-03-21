import React, { useContext } from 'react';
import '../css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UserContext } from '../context/StateProvider';

const ChatHeader = ({ setting, setSetting }) => {
    const [{ currentRoom }] = useContext(UserContext);
    const { name, photo } = currentRoom

    return (
        <div className="chat_header">
            <Avatar src={photo && photo} />
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