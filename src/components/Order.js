import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Order extends Component {
  static defaultProps = {
    movieName: '',
    roomId: '1',
    room: {
      id: '1',
      rows: []
    }
  }

  static propTypes = {
    movieName: PropTypes.string,
    roomId: PropTypes.string,
    room: PropTypes.object
  }

  handleClick (roomId) {
    if (this.props.onConfirm) {
      this.props.onConfirm(roomId);
    }
  }

  render () {
    const { movieName, roomId, room } = this.props;
    let total = 0;
    return (
      <div className="order-panel">
        <p><span>Movie: </span>{movieName}</p>
        <p><span>Room: </span>#{roomId}</p>
        <hr />
        <table className="order-table">
          <thead>
            <tr>
              <th>Seat</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{
            room.rows.map(
              (row) => {
                return row.seats.map(
                  (seat) => {
                    if (seat.status === 'chosen') {
                      total += Number(seat.price);
                      return (
                        <tr>
                          <td>{seat.id}</td>
                          <td>${seat.price}</td>
                        </tr>
                      );
                    }
                    return <tr></tr>;
                  }
                )
              }
            )}
            <tr>
              <td>Total</td>
              <td>${total}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <button onClick={this.handleClick.bind(this, roomId)}><b>Confirm</b></button>
      </div>
    );
  }
}