import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
    <div className="form">
        <input 
        className="input"
        placeholder="Type a message" 
        type="text"
        value={message}
        onChange={event => setMessage(event.target.value)} 
        onKeyPress={event => event.key === 'Enter' ? sendMessage : null} />
        <button 
        className="sendButton"
        type="submit"
        onClick={sendMessage}>Send</button>
    </div>
)

export default Input;