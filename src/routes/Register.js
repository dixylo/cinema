import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../reducers/users';
import icon from '../assets/icon.png';

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin () {
    const { username, password } = this.state;
    if (username === '' || password === '') {
      alert("Neither username nor password can be blank!");
      return;
    }
    const users = this.props.users;
    users.forEach(
      user => {
        if (user.username === username) {
          alert("Username already exists. Please select another one!");
          return;
        }
      }
    );
    this.props.addUser({ username, password });
    this.props.history.push('/login');
  }

  render () {
    return (
      <div className="user">
        <div className="user-panel">
          <p><img alt='icon' src={icon}/><span><i>MilfordCinema</i></span></p>
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
            <button type="button" onClick={this.handleLogin.bind(this)}>Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch(addUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);