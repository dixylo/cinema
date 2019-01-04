import React, { Component } from 'react';
import GoogleMaps from 'google-map-react';
import red_balloon from '../assets/red_balloon.png';

const Marker = ({ text }) => 
  <img
    alt={text}
    src={red_balloon}
    style={{ width: '30px', height: '30px' }}
  />;

export default class Contact extends Component {
  static defaultProps = {
    center: {
      lat: -36.771997,
      lng: 174.766108
    },
    zoom: 11
  };

  render() {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    return (
      <div className='contact'>
        <div className='contact-info'>
          <h1>Contact us</h1>
          <hr />
          <br />
          <p><b>Address: </b>24 Milford Rd, Milford, Auckland 0620</p>
          <p><b>Website: </b>milfordcinema.co.nz</p>
          <p><b>Tel: </b>09 456 7890</p>
          <p><b>Email: </b>info@milfordcinema.co.nz</p>
        </div>
        <div className='map'>
          <GoogleMaps
            bootstrapURLKeys={{ key: googleMapsApiKey }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={-36.771997}
              lng={174.766108}
              text={'Milford Cinema'}
            />
          </GoogleMaps>
        </div>
      </div>
    )
  }
}