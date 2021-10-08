import { io } from 'socket.io-client';
import store from '../store/store';
import env from 'react-dotenv';

class Socket {
  constructor() {
    console.log(env.WS_SERVER);
    this.socket = io(env.WS_SERVER, {
      autoConnect: true,
      closeOnBeforeunload: false,
      reconnection: true,
    });
  }

  async open() {
    this.socket.open();
  }

  async onConnect() {
    this.socket.on('connect', () => {
      console.log('socket - connected');
      this.socket.emit('auth', store.getAuthDataForWS());
      store.setConnection(true);
    });
  }

  async onDisconnect() {
    this.socket.on('disconnect', () => {
      console.log('socket - disconnect');
      store.setConnection(false);
      if (store.isAuth) {
        this.socket.emit('auth', store.getAuthDataForWS());
      }
    });
  }

  async onBroadcastMessage() {
    this.socket.on('broadcast-message', (m) => {
      store.setMessages(m);
    });
  }

  async sendMessage() {
    this.socket.emit('chat-message', store.message);
    store.message = '';
  }
}

const socket = new Socket();

export default socket;
