import React from 'react';
import { IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import '../Chat/ChatApp.css';

const Input = ({ setMessage, sendMessage, message }) => (
    <div className="chat_footer">
        <IconButton>
            <InsertEmoticonIcon />
        </IconButton>
        <form>
            <input 
            className="input"
            placeholder="Type a message" 
            type="text"
            value={message}
            onChange={event => setMessage(event.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
        </form>
        <button 
        className="send"
        type="submit"
        onClick={event => sendMessage(event)}>Send</button>
    </div>
)

export default Input;