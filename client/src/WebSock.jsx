<<<<<<< HEAD
import React, { useRef, useState } from 'react';

const WebSock = () => {
  const socket = useRef();
  const [messages, setMessages] = useState([]),
    [value, setValue] = useState(''),
    [connected, setConnected] = useState(false),
    [username, setUsername] = useState(''),
    [password, setPassword] = useState(''),
    // eslint-disable-next-line no-unused-vars
    [auth, setAuth] = useState('');

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');
=======
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("");

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");
>>>>>>> main

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
<<<<<<< HEAD
        event: 'connection',
=======
        event: "connection",
>>>>>>> main
        username,
        password,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
<<<<<<< HEAD
      console.log('Socket закрыт');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
=======
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
>>>>>>> main
    };
  }

  /* function auth(){
        fetch(``)
    }*/

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
<<<<<<< HEAD
      event: 'message',
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
=======
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
>>>>>>> main
  };

  if (auth) {
    return (
      <div>
        <div className="form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Введите ваше имя"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Введите ваш пароль"
          />

          <button onClick={auth}>Войти</button>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Введите ваше имя"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Введите ваш пароль"
          />

          <button onClick={connect}>Войти</button>
        </div>
      </div>
    );
  }

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
            <div key={mess.id}>
<<<<<<< HEAD
              {mess.event === 'connection' ? (
=======
              {mess.event === "connection" ? (
>>>>>>> main
                <div className="connection_message">
                  Пользователь {mess.username} подключился
                </div>
              ) : (
                <div className="message">
                  {mess.username}. {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSock;
