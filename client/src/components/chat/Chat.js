import './Chat.scss';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useContext } from 'react';
import { Context } from '../home/Home';
import { Link } from 'react-router-dom';
import Messages from '../../components/messages/Messages';
import socket from '../../services/SocketService';
import Libton from '../libton/Libton';
import store from '../../store/store';

function Chat() {
  const { store } = useContext(Context);

  useEffect(() => {
    console.log(localStorage.getItem('token'), "localStorage.getItem('token')");
    if (localStorage.getItem('token')) {
      console.log('checkAuth()...');
      console.log(store.isLoading);
      store.checkAuth().then((r) => {
        /*
        Если авторизованы, то открываем сокет
        */
        if (store.isAuth === true) {
          socket.open();
        }
        /*
        Если установили соединение, то отправляем аутентификационные данные
        */
        socket.onConnect();
        ``;
        /*
        Когда disconnect и если авторизованы, то открываем сокет и отправляем аутентификационные данные
        */
        socket.onDisconnect();
        socket.onBroadcastMessage();
        socket.onOldMessages();
      });
    }
  }, [socket, store]);

  const SendNewMessage = () => {
    console.log('Send ws message...');
    socket.sendMessage();
  };

  const changeMessage = (e) => {
    if (!store.connection) {
      console.log('open');
      socket.open();
    }
    store.setMessage(e.target.value);
  };

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
        <div className="devB">
          <Libton
            to={`/websockets-chat`}
            className="devB"
            text={'To login page'}
          />
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
    </div>
  );
}
export default observer(Chat);
