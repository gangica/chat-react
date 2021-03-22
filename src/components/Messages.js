import React, { useEffect, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { firstOrLastMap, isFirstOrLast } from '../context/utils';
import Message from './Message';
import '../css/Chat.css';

const Messages = ({ messages }) => {
  // scroll to bottom
  const elementRef = useRef();

  useEffect(() => {
    elementRef.current.scrollIntoView()
  }, [messages]);

  return (
    <div className="chat_body">
      <ul className="messages">
        {messages.map((message, i) => {
          let firstMap = firstOrLastMap(messages).firstIndices;
          let lastMap = firstOrLastMap(messages).lastIndices;
          return <Message key={i} message={message} isFirst={isFirstOrLast(i, firstMap)} isLast={isFirstOrLast(i, lastMap)} />
        })}
        <div className="invisible" ref={elementRef} />
      </ul>
    </div>
  )
}

export default Messages;