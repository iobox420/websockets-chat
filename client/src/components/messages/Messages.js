import React, { useEffect, useRef } from 'react';
import './Messages.scss';

const Messages = ({ messages, email }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat-message">
      {messages.map((current, i) => {
        if (current.email === email) {
          return (
            <div className="message" key={i}>
              <p>{current.text}</p>
              <span>{current.email}</span>
            </div>
          );
        } else {
          return (
            <div className="message mess-right" key={i}>
              <p>{current.text} </p>
              <span>{current.email}</span>
            </div>
          );
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
