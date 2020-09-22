import React from 'react';
import Requests from './Requests';
import Members from './Members';

const Modal = ({ type, room, setModal }) => {
    if (type == "requests") {
        return (<Requests room={room} setModal={setModal} />)
    } else if (type == "members") {
        return (<Members room={room} setModal={setModal} />)
    } else {
        return null;
    }
}

export default Modal;