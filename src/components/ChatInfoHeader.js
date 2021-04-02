import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { leaveRoom } from '../context/apicalls';
import { UserContext } from '../context/StateProvider';
import '../css/Chat.css';

import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ChatInfoHeader = () => {
    const [{ user, currentRoomId: roomId }] = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    const leave = async () => {
        setRedirect(true)
        await leaveRoom(roomId, user);
    }

    return (!redirect ? (
        <div className="setting__header">
            <InfoIcon />
            <h4>Room Info</h4>
            <IconButton onClick={leave}>
                <ExitToAppIcon />
            </IconButton>
        </div>
    ) : (<Redirect to='/start' />))
}

export default ChatInfoHeader;