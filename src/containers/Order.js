import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../components/Order';
import { orderSeats } from '../reducers/rooms';

class OrderContainer extends Component {
  static defaultProps = {
    movieId: '1',
    roomId: '1',
    rooms: []
  }

  static propTypes = {
    movieId: PropTypes.string,
    roomId: PropTypes.string,
    rooms: PropTypes.array
  }

  handleConfirm (roomId) {
    this.props.orderSeats(roomId);
  }

  render () {
    const { movieId, roomId, rooms } = this.props;
    const room_i = parseInt(this.props.roomId, 10) - 1;
    const room = {...{id: '1', rows: []}, ...rooms[room_i]};
    return (
      <Order movieId={movieId} roomId={roomId} room={room} onConfirm={this.handleConfirm.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => {
  return { rooms: state.rooms.rooms };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderSeats: (roomId) => {
      dispatch(orderSeats(roomId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);