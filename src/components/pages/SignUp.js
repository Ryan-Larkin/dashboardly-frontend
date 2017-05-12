import React, {Component} from 'react';
import auth from '../../auth';

import './SignUp.css';

const ENTER = 13;

export default class SignUp extends Component {


  _handleSignup = () => {
    let {
      username: {
        value: username
      },
      email: {
        value: email
      },
      password: {
        value: password
      }
    } = this.refs;

    if (username && email && password) {
      auth.signup(username, email, password)
      .then(res => this.props.router.push('/login'))
      .catch(console.error);
    }
    else {
      this.setState({error: "Please fill in all fields"});
    }
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleSignup()
    }
  }

  render() {
    return (
      <div className="signup">
        <div className="group">
          <input className="page-input" type="text" ref="username"
            onKeyUp={this._handleTyping}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="modal-label">Username</label>
        </div>
        <div className="group">
          <input className="page-input" type="text" ref="email"
            onKeyUp={this._handleTyping}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="modal-label">Email</label>
        </div>
        <div className="group">
          <input className="page-input" type="password" ref="password"
            onKeyUp={this._handleTyping}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="modal-label">Password</label>
        </div>
        <button className="signup-btn" onClick={this._handleSignup}><span>Sign Up</span></button>

       {this.state && this.state.error ?
          <p>{this.state.error}</p>
          : null
        }
      </div>
    );
  }

}
