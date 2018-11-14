import React, { Component } from 'react';
import white from './assets/white_chair.png';
import red from './assets/red_chair.png';
import green from './assets/green_chair.png';

export default class Seat extends Component {
  static defaultProps = {
    status: 'vacant'
  }

  constructor (props) {
    super(props);
    this.state = {
      status: props.status
    };
  }

  handleClick () {
    switch (this.state.status) {
      case 'booked':
        alert('You cannot select a booked seat!');
        break;
      case 'chosen':
        this.setState({ status: 'vacant' });
        break;
      case 'vacant':
        this.setState({ status: 'chosen' });
        break;
      default:
        return;
    }
  }

  _updateImage (status) {
    switch (status) {
      case 'booked':
        return red;
      case 'chosen':
        return green;
      case 'vacant':
        return white;
      default:
        return;
    }
  }

  render () {
    return <img src={this._updateImage(this.state.status)} style={{width:'40px',height:'50px',position:'relative'}} onClick={this.handleClick.bind(this)} alt={this.state.status} />
  }
}