import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { UserContext } from '../context/StateProvider';
import db from '../context/firebase';
import firebase from 'firebase';

import '../css/Chat.css';
import Input from './Input';
import Messages from './Messages';
import Requests from './Requests';
import Members from './Members';

import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const Chat = () => {
    const [{ user }] = useContext(UserContext);
    const { roomId } = useParams();
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [reqModal, setReqModal] = useState(false);
    const [memModal, setMemModal] = useState(false);
    const [redirect, setRedirect] = useState(false);
    // const [modal, setModal] = useState(false);
    
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

    const openReqModal = () => {   
        if (!reqModal) {
            setReqModal(true);
            setMemModal(false);
        } else {
            setReqModal(false);
        }
    }

    const openMemModal = () => {   
        if (!memModal) {
            setMemModal(true);
            setReqModal(false);
        } else {
            setMemModal(false);
        }
    }

    const leaveRoom = () => {
        db.collection('users').doc(user.uid).update({
            rooms: firebase.firestore.FieldValue.arrayRemove(roomId)
        })

        db.collection('rooms').doc(roomId).collection('members').where('uid', '==', user.uid).get()
        .then(snapshot => snapshot.docs.map(doc => doc.ref.delete()))
    }

    useEffect(() => {
        db.collection('users').doc(user.uid)
            .onSnapshot(snapshot => {
                if (snapshot.data().rooms.includes(roomId)) {
                    db.collection('rooms')
                        .doc(roomId)
                        .onSnapshot(snapshot => setRoom(snapshot.data().name));

                    db.collection('rooms')
                        .doc(roomId).collection('messages')
                        .orderBy('timestamp', 'asc')
                        .onSnapshot(snapshot =>
                            setMessages(snapshot.docs.map(doc => doc.data())));
                } else {
                    setRedirect(true);
                }
            })

        /** Check room admin
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
            if (snapshot.data().admin.uid == user.uid) {
                setReqButton(true);
            } 
        }) */
    }, [roomId]);

    return ( redirect ? (<Redirect to={{pathname: "/join", state: { room: roomId }}} />) : (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{room}</h3>
                    <p>Last seen at {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate())
                        .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p> 
                </div>
                <IconButton onClick={openReqModal}>
                    <GroupAddIcon />
                </IconButton>
                <IconButton onClick={openMemModal}>
                    <PeopleIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                <IconButton onClick={leaveRoom}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
            <div className="chat_body">
                <div className="modal">
                    {memModal && (<Members room={roomId} openMemModal={openMemModal} />)}
                    {reqModal && (<Requests room={roomId} openReqModal={openReqModal} />)}
                </div>
                {!memModal && !reqModal && <Messages messages={messages} />}
            </div>
            <Input setMessage={setMessage} sendMessage={sendMessage} message={message} />
        </div>   
    ))
}

export default Chat;