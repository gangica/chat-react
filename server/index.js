const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const port = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require( './users.js');

// User action controller at server
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        const { user, error } = addUser({ id: socket.id, name, room });

        socket.join(user.room);

        socket.emit('board', { user: 'admin', text: `${user.name} has joined room ${user.room}`});
        socket.broadcast.to(user.room).emit('board', { user: 'admin', text: `${user.name} just joined!`});

    })

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id);
    
        socket.emit('message', { user: user.name, text: message });
        
    });

    socket.on('disconnect', () => {
        console.log('User left!')
    })
})

app.use(router);

server.listen(port, console.log('server is good'));