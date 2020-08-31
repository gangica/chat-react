// Chat view
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './ChatApp.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Sidebar from '../Sidebar/Sidebar';

import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Online from '../Online/Online';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [board, setBoard] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    // Send join data to server
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);
    
    // Listen to the message returned from server
    useEffect(() => {
        socket.on('board', (board) => {
            setBoard(board);
        })

        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message ]);
            //console.log('set')
            setMessage('');
        })

        socket.on('roomData', (users) => {
            setUsers(users);
            console.log(users);
        })
    }, []);

    // Send input message to server
    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message);
            //console.log('send', message);
        }
    }

    return (
        <div className="app">
            <div className="app_body">
                <Sidebar name={name} />
                <div className="chat">
                    <div className="chat_header">
                        <Avatar />
                        <div className="chat_headerInfo">
                            <h3>{room}</h3>
                            <p>Status: {board.text}</p>
                        </div>
                        <IconButton>
                            <ExitToAppIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>

                    <Messages messages={messages} name={name} />

                    <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
                </div>
            </div>
        </div>
    )
}

// Chat takes the location from Join which includes name and room
// Chat emits location data to the server
// Chat will then use props and set the states with setName and setRoom
export default Chat;