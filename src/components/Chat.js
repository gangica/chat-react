import React, { useState, useEffect, useContext } from 'react';
import { getRoomMessages, getRoomInfo } from '../context/apicalls';
import '../css/Chat.css';
import Input from './Input';
import Messages from './Messages';
import ChatHeader from './ChatHeader';
import ChatInfo from './ChatInfo';
import { UserContext } from '../context/StateProvider';

const Chat = ({ location }) => {
    const { id: roomId } = location.state;
    const [{ currentRoom }, dispatch] = useContext(UserContext);
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState(true);

    useEffect(() => {
        // Get room details
        dispatch({
            type: 'SET_ROOM',
            payload: roomId
        })

        getRoomInfo(roomId, setRoom);
        getRoomMessages(roomId, setMessages);
    }, [roomId])

    return (
        <div className="chat__container">
            {room && (
                <>
                    <div className="chat">
                        <ChatHeader room={room} chatInfo={chatInfo} setChatInfo={setChatInfo} />
                        <Messages messages={messages} />
                        <Input />
                    </div>
                    {chatInfo && <ChatInfo room={room} />}
                </>
            )}
        </div>
    )
}

export default Chat;