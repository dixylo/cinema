import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../reducers/user';
import loading from '../assets/loading.png';
import Modal from '../components/Modal';

class Login extends Component {
  constructor (props) {
    super(props);
    const { username, email } = props.currentUser.user;
    this.state = {
      username,
      email,
      password: '',
      loading: false,
      isModalVisible: false,
      modalHeader: '',
      modalBody: ''
    }
  }

  componentDidMount () {
    this.props.currentUser.hasUserLoggedIn || this.input.focus();
  }

  handleFormChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    if (email === '' || password === '') {
      return this.showModal('Fields Incomplete', 'Please complete all fields!');
    }

    this.setState({ loading: true }, () => {
      this.props.login({ email, password }, this.props.history, () => {
        this.setState({ loading: false });
      });
    });
  };

  handleLogout = () => {
    this.setState({ loading: true }, () => {
      this.props.logout(() => {
        this.setState({ loading: false });
      });
    });
  };

  showModal = (header, body) => {
    this.setState({
      isModalVisible: true,
      modalHeader: header,
      modalBody: body
    });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  render () {
    const { user: { username }, hasUserLoggedIn, modal } = this.props.currentUser;
    return (
      <div className="user">
        <div className="user-panel user-panel-login">
          <p>MILFORD CINEMA</p>
          <hr className='user-panel-hr' />
          {hasUserLoggedIn ?
            <div className='user-panel-div'>
              <br />
              <p>You are now logged in as <i>{username}</i>.</p>
              <br />
              <button
                className='user-panel-button'
                onClick={this.handleLogout}
                disabled={this.state.loading}
              >
                {this.state.loading
                  ? (
                    <div className='loader-wrapper'>
                      <img className='loading' alt='Loading...' src={loading} />
                      &nbsp;
                      <span>Loading</span>
                    </div>
                  )
                  : 'Log out'}
              </button> 
            </div> :
            <div className='user-panel-div'>
              <div className='user-panel-row'>
                <label htmlFor='email'>EMAIL</label>
                <input
                  ref={input => this.input = input}
                  type="email"
                  name="email"
                  className='user-panel-input'
                  value={this.state.email}
                  onChange={this.handleFormChanged}
                />
              </div>
              <div className='user-panel-row'>
                <label htmlFor='password'>PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  className='user-panel-input'
                  value={this.state.password}
                  onChange={this.handleFormChanged}
                />
              </div>
              <button
                className='user-panel-button'
                onClick={this.handleLogin}
                disabled={this.state.loading}
              >
              {this.state.loading
                ? (
                  <div className='loader-wrapper'>
                    <img className='loading' alt='Loading...' src={loading} />
                    &nbsp;
                    <span>Loading</span>
                  </div>
                )
                : 'Log in'}
              </button>
            </div>}
        </div>
        <Modal 
          visibility={modal.visibility || this.state.isModalVisible}
          header={modal.visibility ? modal.header : this.state.modalHeader}
          body={modal.visibility ? modal.body : this.state.modalBody}
          onOk={modal.visibility ? modal.onOk : this.handleOk}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user, callback) => {
      dispatch(login(user, callback));
    },
    logout: (callback) => {
      dispatch(logout(callback));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);