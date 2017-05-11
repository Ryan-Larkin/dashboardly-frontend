import superagent from 'superagent'
import { API_HOST } from './config'

class Api {
  signup = (username, email, password) => (
    superagent
    .post(`${API_HOST}/auth/users`)
    .send({username, email, password})
  )

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

  updateBoard = (boardId, boardData) => (
    superagent
    .patch(`${API_HOST}/boards/${boardId}`)
    .send({boardId, boardData})
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )

  deleteBoard = (boardId) => (
    superagent
    .delete(`${API_HOST}/boards/${boardId}`)
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )

  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
  )

  getUserInfo = () => (
    superagent
    .get(`${API_HOST}/auth/me`)
    .set('Authorization', `token ${localStorage.token}`)
  )


  createBookmark = (title, url, boardId) => (
    superagent
    .post(`${API_HOST}/boards/${boardId}/bookmarks`)
    .send({title, url, boardId})
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )

  updateBookmark = (bookmarkId, bookmarkData) => (
    superagent
    .patch(`${API_HOST}/bookmarks/${bookmarkId}`)
    .send({bookmarkData})
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )
  
  deleteBookmark = (bookmarkId) => (
    superagent
    .delete(`${API_HOST}/bookmarks/${bookmarkId}`)
    .set('Authorization', `token ${localStorage.token}`)
    .catch(err => console.error(err))
  )
}

export default new Api();
