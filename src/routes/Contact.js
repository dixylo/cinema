import React, { Component } from 'react';
import location from '../assets/location.png';

export default class Contact extends Component {

  render() {
    return (
      <div className='about'>
        <div>
          <h1>Our Location</h1>
          <img alt="24 Milford Rd, Milford, Auckland 0620" src={location} ></img>
          <p>Address: 24 Milford Rd, Milford, Auckland 0620</p>
          <p>Website: milfordcinema.co.nz</p>
          <p>Tel: 09 456 7890</p>
        </div>
      </div>
    )
  }
}