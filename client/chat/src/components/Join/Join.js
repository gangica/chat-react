// Join view
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join = () => {  
    // state and set state function  
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input 
                    placeholder="Name" 
                    className="joinInput" 
                    type="text" 
                    onChange={event => setName(event.target.value)} />
                </div>
                <div>
                    <input 
                    placeholder="Room" 
                    className="joinInput mt-20" 
                    type="text" 
                    onChange={event => setRoom(event.target.value)} />
                </div>
                <Link 
                onClick={event => (!name || !room) ? event.preventDefault() : null} 
                to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}


// Join takes props from HTML and sets the states
// After clicking sign in, a new URL is generated with name and room
// Use name and room for Chat
export default Join;