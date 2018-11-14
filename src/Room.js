import React, { Component } from 'react';
import Seat from './Seat';

export default class Room extends Component {
  constructor (props) {
    super(props);
    this.state = {
      seats: [
        {
          room: 1,
          row: 1,
          number: 1,
          price: 20,
          status: 'vacant'
        },
        {
          room: 1,
          row: 1,
          number: 2,
          price: 20,
          status: 'booked'
        },
        {
          room: 1,
          row: 2,
          number: 1,
          price: 20,
          status: 'booked'
        },
        {
          room: 1,
          row: 2,
          number: 2,
          price: 20,
          status: 'vacant'
        },
      ]
    };
  }

  render () {
    return (
      <div style={{width:'950px',height:'600px',border:'1px solid black'}}>
        {this.state.seats.map(
          (seat) => (<Seat status={seat.status}/>)
        )}
      </div>
    );
  }
}