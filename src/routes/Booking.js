import React, { Component } from 'react';
import Room from '../containers/Room';
import Order from '../containers/Order';
import Session from '../components/Session';

const START_DATE = "2019-05-04";
const END_DATE = "2019-05-18";
const DEFAULT_TIME = "08:00 am";

export default class Booking extends Component {
  constructor () {
    super();
    const session = START_DATE.replace(/-/g, '')
      + DEFAULT_TIME.replace(/:/g, '').replace(/\s/g, '');
    this.state = {
      session
    }
  }

  handleSessionSelect (session) {
    this.setState({ session });
  }

  render() {
    const { movieId, roomId } = this.props.match.params;
    const { session } = this.state;
    const dateRange = { startDate: START_DATE, endDate: END_DATE };
    return (
      <div className="box-office">
        <Room movieId={movieId} roomId={roomId} session={session} />
        <Order movieId={movieId} roomId={roomId} session={session} />
        <Session
          dateRange={dateRange}
          onSessionSelect={this.handleSessionSelect.bind(this)}
        />
      </div>
    );
  }
}