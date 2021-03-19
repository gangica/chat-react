import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/StateProvider';

import '../css/Chat.css';
import { Avatar } from '@material-ui/core';
import ReactEmoji from 'react-emoji';
import { getUser } from '../context/apicalls';

const Message = ({ message: { name, type, message, timestamp }, isFirst, isLast }) => {
    const [{ user }] = useContext(UserContext);
    const [userSent, setUserSent] = useState();
    const [renderMessage, setRenderMessage] = useState();

    const getUserSent = async () => {
        let userSent = await getUser(name);
        setUserSent(userSent)
    }

    let isCurrentUserMessage = name === user.uid;

    useEffect(() => {
        getUserSent();
        if (type === "text") {
            setRenderMessage(message)
        } else if (type === "image") {
            setRenderMessage(<img src={message} style={{ minHeight: 200, width: 200 }} />)
        } else {
            setRenderMessage(message)
        }
    }, [])
    
    return (
        isCurrentUserMessage
            ? (<li className="chat_message chat_sender">
                {renderMessage}
            </li>)
            : (<div className="other__message">
                {(isLast && userSent) && <div className="chat__head"><Avatar src={userSent.photoURL} /></div>}
                {(isFirst && userSent) && <span className="chat_name">{userSent.name}</span>}
                <li className="chat_message">
                    {renderMessage}
                </li>
            </div>)
    );
}

export default Message;