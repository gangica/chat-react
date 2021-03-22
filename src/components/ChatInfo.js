import React from 'react';
import '../css/Chat.css';
import ChatInfoTabs from './ChatInfoTabs';
import ChatInfoHeader from './ChatInfoHeader';
import ChatInfoGeneral from './ChatInfoGeneral';

const ChatInfo = ({ room }) => {
    return (
        <div className="sidebar setting">
            <ChatInfoHeader />
            <ChatInfoGeneral room={room} />
            <ChatInfoTabs />
        </div>
    )
}

export default ChatInfo;