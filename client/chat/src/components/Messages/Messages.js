import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import '../Chat/ChatApp.css';

const Messages = ({ messages }) => (
  <ScrollToBottom className="chat_body">
    {messages.map((message, i) => <div key={i}>{<Message message={message} />}</div>)}
  </ScrollToBottom>
);

export default Messages;