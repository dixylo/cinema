import React, { Component } from 'react';
import PropTypes from 'prop-types';
import white from '../assets/white_chair.png';
import red from '../assets/red_chair.png';
import green from '../assets/green_chair.png';

const SEAT_WIDTH = 2;
const SEAT_HEIGHT = 5;
const RESERVED = 'reserved';
const SELECTED = 'selected';
const AVAILABLE = 'available';

export default class Seat extends Component {
  static defaultProps = {
    coor: {
      seat_i: 0,
      row_i: 0,
      seat_num: 0
    },
    status: AVAILABLE
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
      case RESERVED:
        return red;
      case SELECTED:
        return green;
      case AVAILABLE:
        return white;
      default:
        return;
    }
  }

  render () {
    const { id, coor, rowLen, status, roomSize } = this.props;
    const left = (coor.seat_i * SEAT_WIDTH + roomSize.width / 2 - rowLen * SEAT_WIDTH / 2).toString() + 'vw';
    const top = (coor.row_i * SEAT_HEIGHT + 0.16 * roomSize.height).toString() + 'vh';
    const width = SEAT_WIDTH.toString() + 'vw';
    const height = SEAT_HEIGHT.toString() + 'vh';
    return (
      <div
        className="seat"
        onClick={this.handleClick.bind(this)}
        style={{ left, top, width, height }}
      >
        <img src={this._updateImage(status)} alt={status} />
        <span>{id}</span>
      </div>
    );
  }
}