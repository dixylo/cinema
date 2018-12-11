import React, { Component } from 'react';
import { connect } from 'react-redux';
import icon from '../assets/icon.png';
import { login, logout } from '../reducers/login';
import { fetchOrders } from '../reducers/orders';

class Login extends Component {
  constructor (props) {
    super(props);
    const { username, password } = props.currentUser.user;
    this.state = {
      username,
      password
    }
  }

  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin () {
    const users = this.props.users;
    const { username, password } = this.state;
    let matchFound = false;
    users.forEach(
      user => {
        if (user.username === username && user.password === password) {
          matchFound = true;
          this.props.login(user);
          return;
        }
      }
    );
    !matchFound && alert('Username or password not correct!');
  }

  handleLogout() {
    this.props.logout();
  }

  render () {
    return (
      <div className="user">
        <div className="user-panel">
          <p><img alt='icon' src={icon}/><span><i>ilfordCinema</i></span></p>
          {
            this.props.currentUser.hasLoggedIn ?
            <button onClick={this.handleLogout.bind(this)}>Log out</button> :
            <form>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleFormChange.bind(this)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleFormChange.bind(this)}
              />
              <button type="button" onClick={this.handleLogin.bind(this)}>Log in</button>
            </form>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(login(user));
      dispatch(fetchOrders());
    },
    logout: () => {
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);