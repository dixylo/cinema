import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../components/Order';
import { reserveSeats } from '../reducers/rooms';
import { placeOrder } from '../reducers/users';

class OrderContainer extends Component {
  static defaultProps = {
    movieId: '1',
    roomId: '1',
    movies: [],
    rooms: [],
    session: ''
  }

  static propTypes = {
    movieId: PropTypes.string,
    roomId: PropTypes.string,
    movies: PropTypes.array,
    rooms: PropTypes.array,
    session: PropTypes.string,
    reserveSeats: PropTypes.func
  }

  handleConfirm (order) {
    const { reserveSeats, currentUser } = this.props;
    // const rm_i = parseInt(roomId, 10) - 1;
    if (currentUser.hasLoggedIn) {
      const user = currentUser.user;
      const userOrder = { ...order, user };
      reserveSeats(userOrder);
      alert("Reservation Confirmed!");
    } else {
      alert("Please log in to proceed.");
      return;
    }
  }

  render () {
    const { movieId, movies, roomId, rooms, session } = this.props;
    const movie_i = parseInt(movieId, 10) - 1;
    const movieName = movies[movie_i] && movies[movie_i].name;
    const room_i = parseInt(roomId, 10) - 1;
    const room = {...{id: 1, rows: []}, ...rooms[room_i]};
    return (
      <Order
        movieName={movieName}
        roomId={roomId}
        room={room}
        session={session}
        onConfirm={this.handleConfirm.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    rooms: state.rooms.rooms,
    currentUser: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reserveSeats: (order) => {
      dispatch(reserveSeats(order));
      dispatch(placeOrder(order));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);