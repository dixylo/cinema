import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  componentDidMount () {
    this.props.currentUser.hasUserLoggedIn || this.input.focus();
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
        if (user && (user.username === username && user.password === password)) {
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
    const { user, hasUserLoggedIn } = this.props.currentUser;
    return (
      <div className="user">
        <div className="user-panel">
          <p>MILFORD CINEMA</p>
          <hr className='user-panel-hr' />
          {hasUserLoggedIn ?
            <div className='user-panel-div'>
              <br />
              <p>You are now logged in as <i>{user.username}</i>.</p>
              <br />
              <button
                className='user-panel-button'
                onClick={this.handleLogout.bind(this)}
              >
                Log out
              </button> 
            </div> :
            <div className='user-panel-div'>
              <label htmlFor='username'>USERNAME</label>
              <input
                ref={(input) => this.input = input}
                type="text"
                name="username"
                className='user-panel-input'
                value={this.state.username}
                onChange={this.handleFormChange.bind(this)}
              />
              <label htmlFor='password'>PASSWORD</label>
              <input
                type="password"
                name="password"
                className='user-panel-input'
                value={this.state.password}
                onChange={this.handleFormChange.bind(this)}
              />
              <button
                className='user-panel-button'
                onClick={this.handleLogin.bind(this)}
              >
                Log in
              </button>
            </div>}
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