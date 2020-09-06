import React from 'react';

import '../../Chat/ChatApp.css';

import ReactEmoji from 'react-emoji';
import { useStateValue } from '../../../StateProvider';

const Message = ({ message: { name, message, timestamp } }) => {
    const [{ user }, dispatch] = useStateValue();

    let isCurrentUserMsg = false;

    if (name === user.displayName) {
        isCurrentUserMsg = true;
    }

    return (
        isCurrentUserMsg
            ? (<p className="chat_message chat_sender">
                <span className="chat_name chat_name--sender">{name}</span>
                {ReactEmoji.emojify(message)}
                <span className="timestamp timestamp_sender">
                    {new Date(timestamp?.toDate())
                    .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </p>)
            : (<p className="chat_message">
                <span className="chat_name">{name}</span>
                {ReactEmoji.emojify(message)}
                <span className="timestamp">
                    {new Date(timestamp?.toDate())
                    .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </p>)
    );
}

export default Message;