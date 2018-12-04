import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.css';

const START_DATE = "2019-05-04";
const END_DATE = "2019-05-18";
const S1 = "08:00 am";
const S2 = "11:00 am";
const S3 = "02:00 pm";
const S4 = "05:00 pm";
const S5 = "08:00 pm";

export default class Session extends Component {
  static propTypes = {
    dateRange: PropTypes.object,
    onSessionSelect: PropTypes.func
  }

  static defaultProps = {
    dateRange: {
      startDate: START_DATE,
      endDate: END_DATE
    }
  }

  constructor (props) {
    super(props);
    this.state = {
      date: props.dateRange.startDate,
      time: S1
    }
  }

  handleSessionChange (e) {
    this.setState(
      { [e.target.name]: e.target.value },
      () => this.generateSession(this.state.date, this.state.time)
    );
  }

  generateSession (date, time) {
    const session = date.replace(/-/g, '')
      + time.replace(/:/g, '').replace(/\s/g, '');
    if (this.props.onSessionSelect) {
      this.props.onSessionSelect(session);
    }
  }

  render () {
    const { startDate, endDate } = this.props.dateRange;
    return (
      <div className="session-panel">
        <p>Please select a date and a time.</p>
        <hr />
        <input
          type="date"
          name="date"
          min={startDate}
          max={endDate}
          value={this.state.date}
          onChange={this.handleSessionChange.bind(this)}
        />
        <select
          name="time"
          value={this.state.time}
          onChange={this.handleSessionChange.bind(this)}
        >
          <option value={S1}>{S1}</option>
          <option value={S2}>{S2}</option>
          <option value={S3}>{S3}</option>
          <option value={S4}>{S4}</option>
          <option value={S5}>{S5}</option>
        </select>
      </div>
    );
  }
}