import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { isAbleToJoin, joinRoom } from '../context/apicalls';
import { UserContext } from '../context/StateProvider';
import '../css/Join.css';

const Join = () => {
    const [{ user }] = useContext(UserContext);
    const [roomId, setRoomId] = useState();
    const [redirect, setRedirect] = useState(false);
    const [alert, setAlert] = useState();
    
    const join = async (e) => {
        e.preventDefault();

        if (roomId) {
            let res = await isAbleToJoin(roomId, user);
            if (res === true) {
                await joinRoom(roomId, user);
                setRedirect(true)
            } else {
                setAlert(res)
            }
        }
    }

    return (!redirect ? (
        <div className="main join">
            <div className="room wrapper">
                <h2>Join Room</h2>
                <div className="sidebar_search">
                    <div className="sidebar_searchContainer">
                        <input
                            className="input-data"
                            placeholder="Enter room ID..."
                            type="text"
                            onChange={e => setRoomId(e.target.value)} />
                    </div>
                </div>
                {alert && <div className="description alert">{alert}</div>}
                <button
                    className="medium__btn"
                    type="submit"
                    onClick={e => join(e)}>Join</button>
            </div>
        </div>
    ) : (<Redirect to={{ pathname: '/room', state: { id: roomId }}} />))
}

export default Join;