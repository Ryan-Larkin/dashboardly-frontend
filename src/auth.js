import api from './api';
import EventEmitter from 'events';

const emitter = new EventEmitter();

module.exports = {
  login(email, pass) {
    if (localStorage.token) {
      throw new Error('Already logged in')
    }
    else {
      return api.requestLogin(email, pass)
      .then(res => localStorage.token = res.body.token)
      .then(() => emitter.emit('AUTH_CHANGE'))
    }
  },

  signup(username, email, password) {
    return api.signup(username, email, password);
  },

  getToken() {
    return localStorage.token
  },

  logout() {
    return api.requestLogout(localStorage.token)
    .then(res => delete localStorage.token)
    .then(() => emitter.emit('AUTH_CHANGE'))
  },

  isLoggedIn() {
    return !!localStorage.token

  },

  onAuthChange(handler) {
    emitter.on('AUTH_CHANGE', handler);
  },

  offAuthChange(handler) {
    emitter.off('AUTH_CHANGE', handler);
  }
}
