import { io } from 'socket.io-client';
import store from '../store/store';

export class Socket {
  constructor() {
    this.socket = io('localhost:8000', {
      autoConnect: true,
      closeOnBeforeunload: false,
      reconnection: true,
    });
  }

  Open() {
    this.socket.open();
  }

  OnConnect() {
    this.socket.on('connect', () => {
      console.log('socket - connected');
      this.socket.emit('auth', store.getAuthDataForWS());
      store.setConnection(true);
    });
  }

  OnDisconnect() {
    this.socket.on('disconnect', () => {
      console.log('socket - disconnect');
      store.setConnection(false);
      if (store.isAuth) {
        this.socket.emit('auth', store.getAuthDataForWS());
      }
    });
  }

  OnBroadcastMessage() {
    this.socket.on('broadcast-message', (m) => {
      store.setMessages(m);
    });
  }

  SendMessage() {
    this.socket.emit('chat-message', store.message);
  }
}
