import { io } from 'socket.io-client';
import store from '../store/store';
import config from '../config';

class Socket {
  constructor() {
    console.log(config.WS_SERVER);
    this.socket = io(config.WS_SERVER, {
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
  async sendMessage2(m) {
    this.socket.emit('chat-message', m);
  }

  async onOldMessages() {
    this.socket.on('old-messages', (res) => {
      console.log('old messages clg', res);
      store.setOldMessages(res);
    });
  }
}

const socket = new Socket();

export default socket;
