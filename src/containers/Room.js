import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRooms, toggleSeat } from '../reducers/rooms';
import Room from '../components/Room';

class RoomContainer extends Component {
  static propTypes = {
    movieId: PropTypes.string,
    roomId: PropTypes.string,
    rooms: PropTypes.array,
    session: PropTypes.string,
    initRooms: PropTypes.func,
    toggleSeat: PropTypes.func
  }
  
  static defaultProps = {
    movieId: '1',
    roomId: '1',
    session: ''
  }

  componentDidMount () {
    this.props.initRooms();
  }

  handleSeatSelect (coor) {
    const { roomId, session, toggleSeat } = this.props;
    const room_i = parseInt(roomId, 10) - 1;
    coor = { ...coor, room_i, session };
    toggleSeat(coor);
  }

  render () {
    const { roomId, rooms, session } = this.props;
    const room_i = parseInt(roomId, 10) - 1;
    const room = rooms[room_i];
    return (
      <Room
        room={room}
        session={session}
        onSeatSelect={this.handleSeatSelect.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => ({ rooms: state.rooms.rooms });

const mapDispatchToProps = dispatch => ({
  initRooms: () => dispatch(fetchRooms()),
  toggleSeat: coor => dispatch(toggleSeat(coor))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);