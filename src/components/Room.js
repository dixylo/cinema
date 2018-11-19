import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Seat from '../components/Seat';

export default class Room extends Component {
  static propTypes = {
    room: PropTypes.object,
    onSeatSelect: PropTypes.func
  }

  static defaultProps = {
    room: {
      id: 1,
      rows: []
    }
  }

  handleSelect (coor) {
    if (this.props.onSeatSelect) {
      this.props.onSeatSelect(coor);
    }
  }

  render () {
    const { room } = this.props;
    let seat_key = 0;
    return (
      <div className="room">
        <h2>SCREEN</h2>
        {room.rows.map(
          (row, row_i) => {
            const rowLen = row.seats.length;
            return row.seats.map(
              (seat, seat_i) => {
                return (
                  <Seat
                    key={seat_key++}
                    id={seat.id}
                    coor={{ row_i, seat_i }}
                    rowLen={rowLen}
                    status={seat.status}
                    onSelect={this.handleSelect.bind(this)}
                  />
                );
              }
            );
          }
        )}
      </div>
    );
  }
}