import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkEmailValidity, signup } from '../reducers/user';
import loading from '../assets/loading.png';
import Modal from '../components/Modal';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    loading: false,
    isModalVisible: false,
    modalHeader: '',
    modalBody: ''
  }

  componentDidMount () {
    this.input.focus();
  }

  handleFormChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignup = () => {
    const { username, email, password } = this.state;
    if (username === '' || email === '' || password === '') {
      return this.showModal('Fields Incomplete', 'Please complete all fields!');
    }

    if (password.length < 6) {
      return this.showModal('Invalid Password', 'Password should be at least 6 characters.');
    }
    
    this.setState({ loading: true }, () => {
      checkEmailValidity(email).then(isValid => {
        if (isValid) {
          this.props.signup({
            username, email, password
          }, this.props.history, () => this.setState({ loading: false }))
        } else {
          this.showModal('Invalid Email', 'This email is invalid or has been used.');
          this.setState({ loading: false });
        }
      }).catch(err => {
        console.log(err.message);
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
    const { visibility, header, body, onOk } = this.props.modal;

    return (
      <div className="user">
        <div className="user-panel user-panel-signup">
          <p>MILFORD CINEMA</p>
          <hr className='user-panel-hr' />
          <div className='user-panel-div'>
            <div className='user-panel-row'>
              <label htmlFor='username'>USERNAME</label>
              <input
                ref={input => this.input = input}
                type="text"
                name="username"
                className='user-panel-input'
                value={this.state.username}
                onChange={this.handleFormChanged}
              />
            </div>
            <div className='user-panel-row'>
              <label htmlFor='username'>EMAIL</label>
              <input
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
              onClick={this.handleSignup}
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
                : 'Sign up'}
            </button>
          </div>
        </div>
        <Modal 
          visibility={visibility || this.state.isModalVisible}
          header={visibility ? header : this.state.modalHeader}
          body={visibility ? body : this.state.modalBody}
          onOk={visibility ? onOk : this.handleOk}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.user.modal,
    currentUser: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (user, callback) => {
      dispatch(signup(user, callback));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
