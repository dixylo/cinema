import React, { Component } from 'react';
import '../index.css';

export default class Session extends Component {
  constructor () {
    super();
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    this.state = {
      date,
      session: "8am"
    }
  }

  handleSelect (e) {
    const element = e.target;
    switch (element.tagName) {
      case "INPUT":
        this.setState({ date: element.value });
        break;
      case "SELECT":
        this.setState({ session: element.value });
        break;
      default:
        return;
    }
  }

  addDate (date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const year = newDate.getFullYear();
    let month = '' + (newDate.getMonth() + 1);
    let day = '' + newDate.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  render () {
    const today = new Date();
    const latestDate = this.addDate(today, 0);
    const earliestDate = this.addDate(today, 7);
    return (
      <div className="session-panel">
        <p>Please select a date and a session.</p>
        <hr />
        <input
          type="date"
          min={latestDate}
          max={earliestDate}
          value={this.state.date}
          onChange={this.handleSelect.bind(this)}
        />
        <select
          value={this.state.session}
          onChange={this.handleSelect.bind(this)}
        >
          <option value="s1">8:00 AM</option>
          <option value="s2">11:00 AM</option>
          <option value="s3">2:00 PM</option>
          <option value="s4">5:00 PM</option>
          <option value="s5">8:00 PM</option>
        </select>
      </div>
    );
  }
}