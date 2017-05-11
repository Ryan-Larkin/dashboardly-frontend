import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './modals/Menu';
import './App.css';
import api from '../api'
import auth from '../auth';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }

  fetchCurrentUser = () => {
    if (auth.isLoggedIn()) {
      api.getUserInfo()
      .then((result) => {
         this.setState({ user: result.body})
      })
    }
    else {
      this.setState({user: null});
    }
  }

  componentDidMount() {
    this.fetchCurrentUser();
    auth.onAuthChange(this.fetchCurrentUser);
  }
  componentWillUnmount() {
    auth.offAuthChange(this.fetchCurrentUser);
  }

  closeMenu = () => this.setState({ isMenuOpen: false })

  render() {
    let {isMenuOpen, user} = this.state
    return (
      <div className="App">
        <div className="App-navbar">
          <i className="fa fa-bars fa-2x menu-icon"
            onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}
          />
          <Link to="/" className="App-navbar__title">Dashboardly</Link>
          <i className="fa fa-cog fa-2x settings-icon"/>
        </div>

       <Menu show={isMenuOpen}
          username={user ? user.users_username : null}
          avatar={user ? user.users_avatarUrl : null}
          closeMenu={this.closeMenu}
          router={this.props.router}/>

        {React.cloneElement(this.props.children, {user}) }

      </div>
    );
  }
}

export default App;
