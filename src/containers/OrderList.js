import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { sessionToDateTime } from '../services/utils';
import { deleteOrderAsync } from '../reducers/orders';

class OrderList extends Component {
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

  handleClick (userId, orderKey) {
    if (this.props.onDelete) {
      this.props.onDelete(userId, orderKey);
    }
  }

  render () {
    return (
      <table className='admin-table'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Movie Name</th>
            <th>Room ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Seats</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.orders.map((userOrders, userId) =>
            userOrders && Object.keys(userOrders).map(
              (orderKey, i) => {
                const order = userOrders[orderKey];
                return (
                  <tr key={i}>
                    <td>{userId}</td>
                    <td>
                      {order.movieName}
                    </td>
                    <td>
                      {order.roomId}
                    </td>
                    <td>
                      {sessionToDateTime(order.session).date}
                    </td>
                    <td>
                      {sessionToDateTime(order.session).time}
                    </td>
                    <td>
                      {order.selectedSeats.join(', ')}
                    </td>
                    <td>
                      {order.total}
                    </td>
                    <td>
                      <span
                        className='admin-delete'
                        onClick={this.handleClick.bind(this, userId, orderKey)}>
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              }
            )
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (userId, orderKey) => {
      dispatch(deleteOrderAsync(userId, orderKey));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);