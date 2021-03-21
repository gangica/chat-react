import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { firstOrLastMap, isFirstOrLast } from '../context/utils';
import Message from './Message';
import '../css/Chat.css';

const Messages = ({ messages }) => {
  return (
    <div className="chat_body">
      <ul className="messages">
        {messages.map((message, i) => {
          let firstMap = firstOrLastMap(messages).firstIndices;
          let lastMap = firstOrLastMap(messages).lastIndices;
          return <Message key={i} message={message} isFirst={isFirstOrLast(i, firstMap)} isLast={isFirstOrLast(i, lastMap)} />
        })}
      </ul>
    </div>
  )
}

export default Messages;