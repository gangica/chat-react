import React, { useState, useEffect, useContext } from 'react';
import { getRoomMessages, getRoomInfo, getR } from '../context/apicalls';
import '../css/Chat.css';
import Input from './Input';
import Messages from './Messages';
import ChatHeader from './ChatHeader';
import Setting from './Setting';
import { UserContext } from '../context/StateProvider';

const Chat = ({ location }) => {
    const { id: roomId } = location.state;
    const [{ currentRoom }, dispatch] = useContext(UserContext);
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState([]);
    const [setting, setSetting] = useState(true);

    const fetchRoom = (room) => {
        dispatch({
            type: 'SET_ROOM',
            payload: {
                id: room.id,
                name: room.data.name,
                photo: room.data.photo
            }
        })
    }

    useEffect(() => {
        // Get room details
        // getRoomInfo(roomId, setRoom);
        getR(roomId, fetchRoom);
        getRoomMessages(roomId, setMessages);
    }, [roomId])

    return (
        <div className="chat__container">
                <div className="chat">
                    {currentRoom && <ChatHeader setting={setting} setSetting={setSetting} />}
                    <Messages messages={messages} />
                    <Input room={roomId} />
                </div>
            {(setting && currentRoom) && <Setting />}
        </div>
    )
}

export default Chat;