import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sessionToDateTime } from '../services/utils';

export default class Order extends Component {
  static defaultProps = {
    movieName: '',
    roomId: '1',
    room: {
      id: '1',
      rows: []
    },
    date: '',
    time: ''
  }

  static propTypes = {
    movieName: PropTypes.string,
    roomId: PropTypes.string,
    room: PropTypes.object,
    date: PropTypes.string,
    time: PropTypes.string,
    onConfirm: PropTypes.func
  }

  handleClick (order) {
    if (this.props.onConfirm) {
      this.props.onConfirm(order);
    }
  }

  render () {
    const { movieName, roomId, room, session } = this.props;
    const date = sessionToDateTime(session).date;
    const time = sessionToDateTime(session).time;
    let selectedSeats = [];
    let total = 0;
    return (
      <div className='order-panel'>
        <div className='ticket-top'></div>
        <div className='ticket-body'>
          <div className='order-content'>
            <p><span>Movie: </span>{movieName}</p>
            <p><span>Room: </span>#{roomId}</p>
            <p><span>Date: </span>{date}</p>
            <p><span>Time: </span>{time}</p>
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
                      (seat, i) => {
                        if (seat.status[session] === 'selected') {
                          selectedSeats.push(seat.id);
                          total += Number(seat.price);
                          return (
                            <tr key={i}>
                              <td>{seat.id}</td>
                              <td>${seat.price}</td>
                            </tr>
                          );
                        }
                        return <tr key={i}></tr>;
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
            <button
              className='order-button'
              onClick={this.handleClick.bind(
                this, { movieName, session, roomId, selectedSeats, total }
              )}
            >
              <b>Confirm</b>
            </button>
          </div>
        </div>
        <div className='ticket-bottom'></div>
      </div>
    );
  }
}