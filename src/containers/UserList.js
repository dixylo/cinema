import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUserAsync, fetchUsers } from '../reducers/users';

class UserList extends Component {
  componentDidMount () {
    this.props.initUsers();
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

const mapStateToProps = state => ({ users: state.users.users.slice(1) });

const mapDispatchToProps = dispatch => ({
  initUsers: () => dispatch(fetchUsers()),
  onDelete: userId => dispatch(deleteUserAsync(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);