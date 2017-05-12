import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import api from '../../api';
import './Menu.css';

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  _handleLogout = () => {
    auth.logout()
    .then(res => this.props.router.push('/'))
    .then(this.props.closeMenu)
    .catch(console.error);
  }

  getInitialState = () => {
    if(auth.isLoggedIn()) {
      api.getUserInfo()
      .then(result => this.setState({avatar : result.body.users_avatarUrl, username : result.body.users_username}))
    }
  }

  componentWillMount = () => {
    if(auth.isLoggedIn()) {
      api.getUserInfo()
      .then(result => this.setState({avatar : result.body.users_avatarUrl, username : result.body.users_username}))
    }
  }

  handleClickOutside = () => {
    this.props.closeMenu();
  }

  render() {
    let { closeMenu, show, username, avatar } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (
      <div className={`menu ${show?"show":""}`}>

        {isLoggedIn ?
        <div className="menu__header">
          <img src={avatar} alt="profile-pic" className="menu__avatar"/>
          <div className="menu__item"><h3>{username}</h3></div>
        </div>
        : null}

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

          {!isLoggedIn ?
            <Link to="/login" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
          : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
          : null}

          {isLoggedIn ?
            <div className="menu__item" onClick={this._handleLogout}>
              Logout
            </div>
          : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);
