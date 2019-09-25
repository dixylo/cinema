import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sessionToDateTime } from '../services/utils';
import { deleteOrderAsync, fetchOrders } from '../reducers/orders';

class OrderList extends Component {
  componentDidMount () {
    this.props.initOrders();
  }

  handleClick (userId, orderKey) {
    if (this.props.onDelete) {
      this.props.onDelete(userId, orderKey);
    }
  }

  render () {
    const { orders } = this.props;
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
          {Object.keys(orders).map(userId =>
            orders[userId] && Object.keys(orders[userId]).map(
              (orderKey, i) => {
                const order = orders[userId][orderKey];
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

const mapStateToProps = state => ({ orders: state.orders.orders });

const mapDispatchToProps = dispatch => ({
  initOrders: () => dispatch(fetchOrders()),
  onDelete: (userId, orderKey) => dispatch(deleteOrderAsync(userId, orderKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);