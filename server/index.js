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

        socket.emit('board', { user: 'admin', text: `${user.name} has joined`});
        socket.broadcast.to(user.room).emit('board', { user: 'admin', text: `${user.name} just joined`});

        io.to(user.room).emit('roomData', getUsersInRoom(user.room));

    })

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
        
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        
        if (user) {
            io.to(user.room).emit('board', { user: 'admin', text: `${user.name} has left`});
            io.to(user.room).emit('roomData', getUsersInRoom(user.room));
        }
    })
})

app.use(router);

server.listen(port, console.log('server is good'));