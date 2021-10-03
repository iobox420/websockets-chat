import './Chat.scss';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { Context } from '../App';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';
import Messages from '../components/Messages';
import { Socket } from '../services/SocketService';

/*let socket = io('localhost:8000', {
  autoConnect: true,
  closeOnBeforeunload: false,
  reconnection: true,
});*/

let socket = new Socket();

function Chat() {
  const { store } = useContext(Context);

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem('token'), "localStorage.getItem('token')");
    if (localStorage.getItem('token')) {
      console.log('checkAuth()...');
      console.log(store.isLoading);
      store.checkAuth();
    }
    console.log(store.isLoading);
    /*
    Если авторизованы, то открываем сокет
    */
    if (store.isAuth) {
      socket.Open();
    }
    /*
    Если установили соединение, то отправляем аутентификационные данные
    */
    socket.OnConnect();
    /*

    socket.on('connect', () => {
      console.log('socket - connected');
      socket.emit('auth', store.getAuthDataForWS());
      store.setConnection(true);
    });

    */
    /*
    Когда disconnect и если авторизованы, то открываем сокет и отправляем аутентификационные данные
    */
    socket.OnDisconnect();
    /*
    
    socket.on('disconnect', () => {
      console.log('socket - disconnect');
      store.setConnection(false);
      if (store.isAuth) {
        socket.emit('auth', store.getAuthDataForWS());
      }
    });

    */

    socket.OnBroadcastMessage();

    /*
    socket.on('broadcast-message', (m) => {
      store.setMessages(m);
    });

    */
  }, [socket]);

  const stateSocket = () => {
    console.log(socket);
  };

  const SendNewMessage = () => {
    console.log('Send ws message...');
    socket.SendMessage;
  };

  const ChangeRoom1 = () => {
    console.log('Send ws message...');
    socket.emit('change-room', 'room-1');
  };

  const ChangeRoom2 = () => {
    console.log('Send ws message...');
    socket.emit('change-room', 'room-2');
  };

  const ChangeRoomGeneral = () => {
    console.log('Send ws message...');
    socket.emit('change-room', 'general');
  };

  const openSocket = () => {
    console.log('start open socket...');
    socket.open();
  };

  const closeSocket = () => {
    console.log('start close socket...');
    socket.close();
  };

  const auth = () => {
    socket.emit('auth', store.getAuthDataForWS());
  };

  const consoleLogAccessToken = () => {
    console.log(store.getAuthDataForWS());
  };

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const changeMessage = (e) => {
    if (!store.connection) {
      console.log('open');
      socket.Open();
    }
    store.setMessage(e.target.value);
  };

  const ForFevFunc = () => {
    return (
      <div>
        {' '}
        <button onClick={auth}>auth</button>
        <button onClick={openSocket}>open socket</button>
        <button onClick={closeSocket}>close socket</button>
        <button onClick={auth}>socket.emit(auth,auth-data);</button>
        <button onClick={consoleLogAccessToken}>
          console.log(store.getAccessToken())
        </button>
        <button onClick={stateSocket}>state socket</button>
        <button
          onClick={() => {
            console.log(store);
          }}
        >
          STORE
        </button>
        <button onClick={getUsers}>Отобразить users</button>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    );
  };

  /*
























  */

  if (store.isLoading) {
    return (
      <div className="chat">
        <div className="center">Загрузка</div>
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className="chat">
        <div className="center">Вы не авторизованы</div>
        <div className="auth">
          <Link to={`/`}>
            <button>Перейти на главную</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="user-name">
        <h2>{store.user.email}</h2>
      </div>
      <Messages messages={store.messages} email={store.user.email} />
      <div className="send">
        <input
          placeholder="enter your message"
          value={store.message}
          onChange={changeMessage}
        />
        <button onClick={SendNewMessage}>Send</button>
      </div>
      <ForFevFunc />
    </div>
  );
}
export default observer(Chat);
