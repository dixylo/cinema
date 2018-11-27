import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Seat from '../components/Seat';

const ROOM_WIDTH = 735;
const ROOM_HEIGHT = 400;

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
    const width = ROOM_WIDTH;
    const height = ROOM_HEIGHT;
    return (
      <div className="room" style={{ width, height }}>
        <p>SCREEN</p>
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
                    roomSize = {{ width, height }}
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