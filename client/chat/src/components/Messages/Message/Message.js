import React from 'react';

import '../../Chat/ChatApp.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
    const trimmedName = name.trim().toLowerCase();

    let isCurrentUserMsg = false;

    if (user === trimmedName) {
        isCurrentUserMsg = true;
    }

    return (
        isCurrentUserMsg
            ? (<p className="chat_message chat_sender">
                <span className="chat_name chat_name--sender">{trimmedName}</span>
                {ReactEmoji.emojify(text)}
                <span className="timestamp timestamp_sender">21:17</span>
            </p>)
            : (<p className="chat_message">
                <span className="chat_name">{user}</span>
                {ReactEmoji.emojify(text)}
                <span className="timestamp">21:17</span>
            </p>)
    );
}

export default Message;