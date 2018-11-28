import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initRooms, updateSeat } from '../reducers/rooms';
import Room from '../components/Room';
// import layout from '../assets/cinema.xml';

class RoomContainer extends Component {
  static propTypes = {
    movieId: PropTypes.string,
    roomId: PropTypes.string,
    rooms: PropTypes.array,
    initRooms: PropTypes.func,
    updateSeat: PropTypes.func
  }
  
  static defaultProps = {
    movieId: '1',
    roomId: '1'
  }

  componentDidMount () {
    // Initialize seat layout
    this._loadSeats();
  }

  _loadSeats () {
    // Load seats from XML
    // and pass it to Room in render
    // const xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", layout, false);
		// xmlhttp.send();
		// const xmlDoc = xmlhttp.responseXML;
    // const roomList = xmlDoc.getElementsByTagName("Room");
    // const rooms = [...roomList];
	  // const rmsLen = rooms.length;
	  // for (var k = 0; k < rmsLen; k++) {
    //   const rowList = roomList[k].getElementsByTagName("Row");
    //   rooms[k] = { id: k + 1, rows: [...rowList] };	    
    //   const rwsLen = rowList.length;
	  //   for (var j = 0; j < rwsLen; j++) {
    //     const seatList = rowList[j].getElementsByTagName("Seat");
    //     rooms[k].rows[j] = { id: j + 1, seats: [...seatList] };
	  //     const stsLen = seatList.length;
	  //     for (var i = 0; i < stsLen; i++) {
    //       const id = seatList[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
    //       const status = seatList[i].getElementsByTagName("Status")[0].childNodes[0].nodeValue;
    //       const price = seatList[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
    //       rooms[k].rows[j].seats[i] = { id, status, price };
	  //   	}
	  //   }
    // }

    // Load slides
    fetch("https://cinema-react.firebaseio.com/cinema/rooms.json")
    .then(response => response.json())
    .then(rooms => this.props.initRooms(rooms));
    // this.props.initRooms(rooms);
    // var jsn = JSON.stringify({ rooms });
    // fetch("https://cinema-react.firebaseio.com/cinema.json", {
    //   method: 'PATCH',
    //   body: jsn
    // }).then(response => console.log(response.status)).catch(err => console.log(err));
  }

  handleSeatSelect (coor) {
    const room_i = parseInt(this.props.roomId, 10) - 1;
    coor = { ...coor, room_i };
    this.props.updateSeat(coor);
  }

  render () {
    const { roomId, rooms } = this.props;
    const room_i = parseInt(roomId, 10) - 1;
    const room = rooms[room_i];
    return (
      <Room room={room} onSeatSelect={this.handleSeatSelect.bind(this)} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initRooms: (rooms) => {
      dispatch(initRooms(rooms));
    },
    updateSeat: (coor) => {
      dispatch(updateSeat(coor));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);