import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor (props) {
    super(props);
    const { users, currentUser } = props;
    const thisUser = users.filter(user => user.username === currentUser.user.username);
    this.state = {
      user: thisUser[0]
    };
  }
  render() {
    const { username, password, orders } = this.state.user;
    return (
      <div className='user'>
        <div className="user-panel">
          <p>User Information</p>
          <form>
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
          </form>
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
              {Object.keys(orders).map(
                (key, i) => {
                  const { movieName, session, roomId, selectedSeats, total } = orders[key];
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
    users: state.users.users,
    currentUser: state.login
  };
};

export default connect(mapStateToProps)(Profile);