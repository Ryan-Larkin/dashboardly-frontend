import superagent from 'superagent'
import { API_HOST } from './config'

class Api {
  // new code
  signup = (username, email, password) => (
    superagent
    .post(`${API_HOST}/auth/users`)
    .send({username, email, password})
  )
  // *****
  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
  )

  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Authorization', `token ${token}`)
  )

  getBoardsList = (page, count) => (
    superagent
    .get(`${API_HOST}/boards`)
  )

  getBoard = (id) => (
    superagent
    .get(`${API_HOST}/boards/${id}`)
  )

  createBoard = (title, description) => (
    superagent
    .post(`${API_HOST}/boards`)
    .send({title, description})
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )

  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
  )

  createBookmark = (title, url, boardId) => (
    superagent
    .post(`${API_HOST}/boards/${boardId}/bookmarks`)
    .send({title, url, boardId})
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )
}

export default new Api();
