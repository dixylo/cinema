import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../reducers/user';
import { sessionToDateTime } from '../services/utils';
import Modal from '../components/Modal';
import { fetchUserOrders } from '../reducers/orders';

class Profile extends Component {
  state = {
    isChangePasswordShown: false,
    currentpassword: '',
    newpassword: '',
    isModalVisible: false,
    modalHeader: '',
    modalBody: ''
  };

  componentDidMount () {
    this.props.initUserOrders(this.props.currentUser.user.userId);
  }

  handleChangePasswordShown () {
    this.setState({ isChangePasswordShown: !this.state.isChangePasswordShown });
  }

  handlePasswordChange () {
    const { currentpassword, newpassword } = this.state;
    // const { password } = this.props.currentUser.user;
    // if (currentpassword !== password) {
    //   return this.showModal('Reset Failed', 'Current password is not correct!');
    // } else 
    if (newpassword === '') {
      return this.showModal('Reset Failed', 'New password cannot be blank!');
    } else {
      this.props.changePassword(newpassword);
    }
  }

  handlePasswordInput (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

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

  render() {
    const { userId, username, email } = this.props.currentUser.user;
    const { orders, modal } = this.props;
    const currentUserOrders = orders && orders[userId];
    return (
      <div className='user'>
        <div className="profile">
          <p><b>User Information</b></p>
          <hr className='user-panel-hr' />
          <div className='user-panel-div'>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                className='user-panel-input'
                value={username || ''}
                disabled
              />
            </div>
            <div>
              <label htmlFor="email">User Email: </label>
              <input
                type="text"
                name="email"
                id="email"
                className='user-panel-input'
                value={email || ''}
                disabled
              />
            </div>
            {this.state.isChangePasswordShown &&
              <div>
                {/* <div>
                  <label htmlFor="currentpassword">Current Password: </label>
                  <input
                    type="password"
                    name="currentpassword"
                    id="currentpassword"
                    className='user-panel-input'
                    onChange={this.handlePasswordInput.bind(this)}
                  />
                </div> */}
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
    orders: state.orders.orders,
    modal: state.user.modal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initUserOrders: (userId) => dispatch(fetchUserOrders(userId)),
    changePassword: (newPassword) => {
      dispatch(changePassword(newPassword));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
