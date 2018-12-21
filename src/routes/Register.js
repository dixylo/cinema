import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserAsync } from '../reducers/users';

class Register extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount () {
    this.input.focus();
  }

  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignup () {
    const { username, password } = this.state;
    if (username === '' || password === '') {
      alert("Neither username nor password can be blank!");
      return;
    }
    const { users } = this.props;
    const arrayKeys = Object.keys(users);
    const userId = Math.max(...arrayKeys) + 1;
    users.forEach(
      user => {
        if (user.username.toLowerCase() === username.toLowerCase()) {
          alert("Username already exists. Please select another one!");
          return;
        }
      }
    );
    this.props.addUser({ userId, username, password });
    this.props.history.push('/login');
  }

  render () {
    return (
      <div className="user">
        <div className="user-panel">
          <p>MILFORD CINEMA</p>
          <hr className='user-panel-hr' />
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
              onClick={this.handleSignup.bind(this)}
            >
              Sign up
            </button>
          </div>
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
      dispatch(addUserAsync(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);