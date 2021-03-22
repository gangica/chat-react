import React, { useState, useContext } from 'react';
import { UserContext } from '../context/StateProvider';
import { Redirect } from 'react-router-dom';
import { createRoom } from '../context/apicalls';

const Create = () => {
    const [{ user }] = useContext(UserContext);
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const create = async (e) => {
        e.preventDefault()
        if (roomName) {
            let roomId = await createRoom(roomName, user);
            setRoomId(roomId);
            setRedirect(true);
        }
    }

    return (!redirect ? (
        <div className="chat_body join">
            <div className="room wrapper">
                <h2>Create New Room</h2>
                <div className="sidebar_search">
                    <div className="sidebar_searchContainer">
                        <input
                            className="input-data"
                            placeholder="Name your room..."
                            type="text"
                            onChange={e => setRoomName(e.target.value)} />
                    </div>
                </div>
                
                <button
                    className="medium__btn"
                    type="submit"
                    onClick={e => create(e)}>Create</button>
            </div>
        </div>
    ) : (<Redirect to={{ pathname: '/room', state: { id: roomId }}} />))
}

export default Create;