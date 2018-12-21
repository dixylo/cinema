import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUserAsync } from '../reducers/users';
// import PropTypes from 'prop-types';

class UserList extends Component {
  static defaultProps = {
    // movieName: '',
    // roomId: '1',
    // room: {
    //   id: '1',
    //   rows: []
    // },
    // date: '',
    // time: ''
  }

  static propTypes = {
    // movieName: PropTypes.string,
    // roomId: PropTypes.string,
    // room: PropTypes.object,
    // date: PropTypes.string,
    // time: PropTypes.string,
    // onConfirm: PropTypes.func
  }

  handleClick (userId) {
    if (this.props.onDelete) {
      this.props.onDelete(userId);
    }
  }

  render () {
    return (
      <table className='admin-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map(
            (user, i) => user && (
              <tr key={i}>
                <td>{user.userId}</td>
                <td>
                  {user.username}
                </td>
                <td>
                  <span
                    className='admin-delete'
                    onClick={this.handleClick.bind(this, user.userId)}>
                    Delete
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users.slice(1)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (userId) => {
      dispatch(deleteUserAsync(userId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);