import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { API_URL } from '../http';
import axios from 'axios';

class Store {
  //eslint-disable-line
  user = {};
  isAuth = false;
  isLoading = false;
  accessToken = '';
  connection = false;
  message = '';
  messages = [];

  constructor() {
    makeAutoObservable(this);
  }

  setMessage(text) {
    this.message = text;
  }

  setMessage2(e) {
    this.message = e.target.value;
  }

  setMessages(m) {
    let temp = this.messages;
    temp.push({
      email: m.email,
      text: m.text,
    });
    this.messages = [...temp];
  }

  setConnection(bool) {
    this.connection = bool;
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAccessToken(response.data.accessToken);
      console.log(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log('Check auth', response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setAccessToken(response.data.accessToken);
    } catch (e) {
      console.log(e.response?.data.message);
    } finally {
      this.setLoading(false);
    }
  }

  getAuthDataForWS() {
    return {
      id: this.user.id,
      email: this.user.email,
      accessToken: this.accessToken,
    };
  }
}

const store = new Store();
export default store;
