import React, { useState, useEffect, useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';
import '../css/Chat.css';
import { UserContext } from '../context/StateProvider';

const Messages = ({ messages }) => {
  const firstOrLastMap = (messages) => {
    let indices = {
      firstIndices: [],
      lastIndices: []
    }

    let last = 0;
    let first = 0;

    for (let i = 0; i < messages.length; i++) {
      if (!messages[i - 1]) {
        indices.firstIndices.push(i);
      }

      if (!messages[i + 1]) {
        indices.lastIndices.push(i);
        return indices
      }

      if (messages[i].name === messages[i + 1].name) {
        last = i + 1;
      } else {
        last = i;
        first = i + 1;
        indices.lastIndices.push(last);
        indices.firstIndices.push(first)
      }
    }

    return indices
  }

  const isFirstOrLast = (index, mapIndex) => {
    return mapIndex.includes(index) ? true : false
  }

  return (
    <ul className="messages">
      {messages.map((message, i) => {
        let firstMap = firstOrLastMap(messages).firstIndices;
        let lastMap = firstOrLastMap(messages).lastIndices;
        return <Message key={i} message={message} isFirst={isFirstOrLast(i, firstMap)} isLast={isFirstOrLast(i, lastMap)} />
      })}
    </ul>
  )
}

export default Messages;