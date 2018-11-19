import React, { Component } from 'react';
import PropTypes from 'prop-types';
import white from '../assets/white_chair.png';
import red from '../assets/red_chair.png';
import green from '../assets/green_chair.png';

const ROOM_WIDTH = 950;
const SEAT_WIDTH = 40;
const SEAT_HEIGHT = 50;
const OFFSET_TOP = 100;
const BOOKED = 'booked';
const CHOSEN = 'chosen';
const VACANT = 'vacant';

export default class Seat extends Component {
  static defaultProps = {
    coor: {
      seat_i: 0,
      row_i: 0,
      seat_num: 0
    },
    status: VACANT
  }

  static propTypes = {
    coor: PropTypes.object,
    status: PropTypes.string,
    onSelect: PropTypes.func
  }

  handleClick () {
    const { coor, onSelect } = this.props;
    if (onSelect) {
      onSelect(coor);
    }
  }

  _updateImage (status) {
    switch (status) {
      case BOOKED:
        return red;
      case CHOSEN:
        return green;
      case VACANT:
        return white;
      default:
        return;
    }
  }

  render () {
    const { id, coor, rowLen, status } = this.props;
    let left = (coor.seat_i * SEAT_WIDTH + ROOM_WIDTH / 2 - rowLen * SEAT_WIDTH / 2).toString() + 'px';
    let top = (coor.row_i * SEAT_HEIGHT + OFFSET_TOP).toString() + 'px';
    return (
      <div
        className="seat"
        onClick={this.handleClick.bind(this)}
        style={{ left, top }}
      >
        <img src={this._updateImage(status)} alt={status} />
        <span>{id}</span>
      </div>
    );
  }
}