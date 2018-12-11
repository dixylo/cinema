import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePasswordAsync } from '../reducers/users';

class Profile extends Component {
  state = {
    isChangePasswordShown: false,
    currentpassword: '',
    newpassword: ''
  };

  handlePasswordChange () {
    const { isChangePasswordShown, currentpassword, newpassword } = this.state;
    const { userId, password } = this.props.currentUser.user;
    if (isChangePasswordShown) {
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
    this.setState({ isChangePasswordShown: !isChangePasswordShown });
  }

  handlePasswordInput (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { userId, username, password } = this.props.currentUser.user;
    const { orders } = this.props;
    console.log(orders);
    const currentUserOrders = orders[userId];
    return (
      <div className='user'>
        <div className="user-panel">
          <p>User Information</p>
          <div>
            <div>
              <label htmlFor="userid">User ID: </label>
              <input
                type="text"
                name="userid"
                id="userid"
                value={userId}
                disabled
                style={{display: 'inline'}}
              />
            </div>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                disabled
                style={{display: 'inline'}}
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
                    style={{display: 'inline'}}
                    onChange={this.handlePasswordInput.bind(this)}
                  />
                </div>
                <div>
                  <label htmlFor="newpassword">New Password: </label>
                  <input
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    style={{display: 'inline'}}
                    onChange={this.handlePasswordInput.bind(this)}
                  />
                </div>
              </div> :
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  disabled
                  style={{display: 'inline'}}
                />
              </div>
            }
            <div>
              <button
                onClick={this.handlePasswordChange.bind(this)}
              >
                {this.state.isChangePasswordShown
                  ? 'Save Change' : 'Change Password'}
              </button>
            </div>
          </div>
          <table className="order-table">
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
                  const date = [session.slice(0, 4), session.slice(4, 6), session.slice(6, 8)].join('-');
                  const time = session.slice(8, 10) + ':' + session.slice(10, 12) + ' ' + session.slice(12, 14);
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
          </table>
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