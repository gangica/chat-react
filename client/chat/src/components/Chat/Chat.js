// Chat view
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [board, setBoard] = useState([]);
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

    // Listen to the board from server
    useEffect(() => {
        socket.on('board', (board) => {
            setBoard(board);
        })
    }, []);
    
    // Listen to the message returned from server
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message ]);
        })
    }, []);

    // Send input message to server
    const sendMessage = () => {
        if (message) {
            socket.emit('sendMessage', message);
        }
    }

    return (
        <div>
            <h1>Chat {name}</h1>
            <h1>Board: {board.text} </h1>
            <h1>{messages.map(m => m.text)} </h1>
            <input 
            placeholder="message" 
            type="text" 
            onChange={event => setMessage(event.target.value)} />
            <button type="submit" onClick={sendMessage}>Send</button>
        </div>
    )
}

// Chat takes the location from Join which includes name and room
// Chat emits location data to the server
// Chat will then use props and set the states with setName and setRoom
export default Chat;