import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomMessages, getRoomById } from '../context/apicalls';
import '../css/Chat.css';
import Input from './Input';
import Messages from './Messages';
import ChatHeader from './ChatHeader';
import Setting from './Setting';

const Chat = ({ location }) => {
    const { id: roomId } = location.state;
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState([]);
    const [setting, setSetting] = useState(true);

    useEffect(() => {
        // Get room details
        getRoomById(roomId, setRoom);
        getRoomMessages(roomId, setMessages);
    }, [roomId])

    return (
        <div className="chat__container">
            <div className="chat">
                {room && <ChatHeader name={room.data.name} roomPhoto={room.data.photo} setting={setting} setSetting={setSetting} />}
                <div className="chat_body">
                    {room && <Messages messages={messages} />}
                </div>
                <Input room={roomId} />
            </div>
            {(setting && room) && <Setting roomId={roomId} roomName={room.data.name} roomPhoto={room.data.photo} />}
        </div>
    )
}

export default Chat;