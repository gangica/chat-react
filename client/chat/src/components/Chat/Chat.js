// Chat view
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './ChatApp.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Join from '../Join/Join';

import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';
// import Online from '../Online/Online';

let socket;

const Chat = () => {
    const [{ user }, dispatch] = useStateValue();
    const [room, setRoom] = useState('');
    const [join, setJoin] = useState(false);
    const { roomId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        db.collection('users').doc(user.uid).get()
            .then(doc => doc.data().rooms)
            .then(rooms => {
                if (rooms.includes(roomId)) {
                    db.collection('rooms')
                        .doc(roomId)
                        .onSnapshot(snapshot => setRoom(snapshot.data().name));

                    db.collection('rooms')
                        .doc(roomId).collection('messages')
                        .orderBy('timestamp', 'asc')
                        .onSnapshot(snapshot =>
                        setMessages(snapshot.docs.map(doc => doc.data())));

                    setJoin(false);    
                } else {
                    setJoin(true);
                }
            }).catch(error => console.log('Join'));

    }, [roomId])

    // Send input message to server
    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            db.collection('rooms').doc(roomId)
            .collection('messages').add({
                message: message,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

            setMessage('');
        }
    }

    return ( join ? (<Join />) : (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{room}</h3>
                    <p>Last seen at {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate())
                        .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <IconButton>
                    <ExitToAppIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>

            <Messages messages={messages} />

            <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
        </div>   
    ))
}

// Chat takes the location from Join which includes name and room
// Chat emits location data to the server
// Chat will then use props and set the states with setName and setRoom
export default Chat;