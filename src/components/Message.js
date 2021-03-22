import React, { useContext } from 'react';
import { UserContext } from '../context/StateProvider';

import '../css/Chat.css';
import { Avatar } from '@material-ui/core';
import ReactEmoji from 'react-emoji';

const Message = ({ message, isFirst, isLast }) => {
    const { content, type, author, timestamp } = message;
    const [{ user }] = useContext(UserContext);

    let isCurrentUserMessage = author.id === user.uid;

    const renderMessage = () => {
        switch (type) {
            case 'image':
                return <img src={content} style={{ width: 200 }} />
            
            default:
                return content
        }
    }
    
    return (
        isCurrentUserMessage
            ? (<li className="chat_message chat_sender">
                {renderMessage()}
            </li>)
            : (<div className="other__message">
                {(isLast) && <div className="chat__head"><Avatar src={author.photo} /></div>}
                {(isFirst) && <span className="chat_name">{author.name}</span>}
                <li className="chat_message">
                    {renderMessage()}
                </li>
            </div>)
    );
}

export default Message;