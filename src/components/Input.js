import React from 'react';

import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import '../css/Chat.css';

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
        <IconButton>
            <SendIcon onClick={event => sendMessage(event)} />
        </IconButton>
    </div>
)

export default Input;