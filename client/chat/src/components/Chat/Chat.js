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
import { useParams } from 'react-router-dom';
import db from '../../firebase';
// import Online from '../Online/Online';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [board, setBoard] = useState([]);
    const { roomId } = useParams();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => setRoom(snapshot.data().name))
        }

    }, [roomId])

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('join', { name: 'admin', room: room})
        
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
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
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
    )
}

// Chat takes the location from Join which includes name and room
// Chat emits location data to the server
// Chat will then use props and set the states with setName and setRoom
export default Chat;