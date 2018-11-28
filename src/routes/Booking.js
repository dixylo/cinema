import React, { Component } from 'react';
import Room from '../containers/Room';
// import Order from '../containers/Order';
import Session from '../components/Session';

export default class Booking extends Component {
  constructor () {
    super();
    this.state = {
      room: {
        id: 1,
        rows: []
      }
    }
  }

  render() {
    const { match } = this.props;
    const { movieId, roomId } = match.params;
    return (
      <div className="box-office">
        {/* <Order movieId={movieId} roomId={roomId} /> */}
        <Room movieId={movieId} roomId={roomId} />
        <Session />
      </div>
    );
  }
}