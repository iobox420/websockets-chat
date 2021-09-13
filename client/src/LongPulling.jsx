<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LongPulling = () => {
  const [messages, setMessages] = useState([]),
    [value, setValue] = useState('');
=======
import React, { useEffect, useState } from "react";
import axios from "axios";

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
>>>>>>> main

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
<<<<<<< HEAD
      const { data } = await axios.get('http://localhost:5000/get-messages');
=======
      const { data } = await axios.get("http://localhost:5000/get-messages");
>>>>>>> main
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
<<<<<<< HEAD
    await axios.post('http://localhost:5000/new-messages', {
=======
    await axios.post("http://localhost:5000/new-messages", {
>>>>>>> main
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPulling;
