import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePasswordAsync } from '../reducers/users';
import { sessionToDateTime } from '../services/utils';

class Profile extends Component {
  state = {
    isChangePasswordShown: false,
    currentpassword: '',
    newpassword: ''
  };

  handleChangePasswordShown (e) {
    this.setState({ isChangePasswordShown: !this.state.isChangePasswordShown });
  }

  handlePasswordChange () {
    const { currentpassword, newpassword } = this.state;
    const { userId, password } = this.props.currentUser.user;
    if (currentpassword !== password) {
      alert('Current password is not correct!');
      return;
    } else if (newpassword === '') {
      alert('New password cannot be blank!');
      return;
    } else {
      this.props.changePassword(userId, newpassword);
    }
  }

  handlePasswordInput (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { userId, username, password } = this.props.currentUser.user;
    const { orders } = this.props;
    const currentUserOrders = orders[userId];
    return (
      <div className='user'>
        <div className="profile">
          <p><b>User Information</b></p>
          <hr className='user-panel-hr' />
          <div className='user-panel-div'>
            <div>
              <label htmlFor="userid">User ID: </label>
              <input
                type="text"
                name="userid"
                id="userid"
                className='user-panel-input'
                value={userId}
                disabled
              />
            </div>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                className='user-panel-input'
                value={username}
                disabled
              />
            </div>
            {this.state.isChangePasswordShown ?
              <div>
                <div>
                  <label htmlFor="currentpassword">Current Password: </label>
                  <input
                    type="password"
                    name="currentpassword"
                    id="currentpassword"
                    className='user-panel-input'
                    onChange={this.handlePasswordInput.bind(this)}
                  />
                </div>
                <div>
                  <label htmlFor="newpassword">New Password: </label>
                  <input
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    className='user-panel-input'
                    onChange={this.handlePasswordInput.bind(this)}
                  />
                </div>
                <button
                  className='user-panel-button'
                  onClick={this.handlePasswordChange.bind(this)}
                >
                  Save Change
                </button>
              </div> :
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className='user-panel-input'
                  value={password}
                  disabled
                />
              </div>}
            <p
              className='change-password-toggle'
              onClick={this.handleChangePasswordShown.bind(this)}
            >
              {this.state.isChangePasswordShown ?
                'Cancel Change' : 'Change Password'}
            </p>
          </div>
          {currentUserOrders && <table className="admin-table" style={{ marginLeft: '-30px'}}>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Movie</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Seat(s)</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(currentUserOrders).map(
                (order, i) => {
                  const { movieName, session, roomId, selectedSeats, total } = order;
                  const date = sessionToDateTime(session).date;
                  const time = sessionToDateTime(session).time;
                  const seats = selectedSeats.join(', ');
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{movieName}</td>
                      <td>{date}</td>
                      <td>{time}</td>
                      <td>{roomId}</td>
                      <td>{seats}</td>
                      <td>${total}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.login,
    orders: state.orders.orders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (userId, password) => {
      dispatch(changePasswordAsync(userId, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);