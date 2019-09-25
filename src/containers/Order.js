import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../components/Order';
import Modal from '../components/Modal';
import { reserveSeatsAsync } from '../reducers/rooms';
import { addOrderAsync } from '../reducers/orders';

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

  state = {
    isModalVisible: false,
    modalHeader: '',
    modalBody: '',
    modalCallback: null
  };

  handleConfirm = order => {
    const { placeOrder, currentUser } = this.props;
    if (currentUser.hasUserLoggedIn) {
      if (order.selectedSeats.length === 0) {
        this.showModal(
          'Invalid Order',
          'No Seat has been selected.',
          () => this.setState({ isModalVisible: false })
        );
      } else {
        const userId = currentUser.user.userId;
        placeOrder(userId, order);
      }
    } else {
        this.showModal(
          'Permission Needed',
          'Please log in to proceed.',
          () => this.setState({ isModalVisible: false })
        );
    }
  };

  showModal = (header, body, callback) => {
    this.setState({
      isModalVisible: true,
      modalHeader: header,
      modalBody: body,
      modalCallback: callback
    });
  };

  render () {
    const { movieId, movies, roomId, rooms, session, modal } = this.props;
    const movie_i = parseInt(movieId, 10);
    const movieName = movies[movie_i] && movies[movie_i].name;
    const room_i = parseInt(roomId, 10) - 1;
    const room = {...{id: 1, rows: []}, ...rooms[room_i]};
    return (
      <div>
        <Order
          movieName={movieName}
          roomId={roomId}
          room={room}
          session={session}
          onConfirm={this.handleConfirm}
        />
        <Modal
          visibility={modal.visibility || this.state.isModalVisible}
          header={modal.visibility ? modal.header : this.state.modalHeader}
          body={modal.visibility ? modal.body : this.state.modalBody}
          onOk={modal.visibility ? modal.onOk : this.state.modalCallback}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    rooms: state.rooms.rooms,
    modal: state.rooms.modal,
    currentUser: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeOrder: (userId, order) => {
      dispatch(reserveSeatsAsync(order));
      dispatch(addOrderAsync(userId, order));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);