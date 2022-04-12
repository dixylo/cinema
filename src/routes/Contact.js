import React, { Component } from 'react';
export default class Contact extends Component {
  render() {
    return (
      <div className='contact'>
        <div className='contact-wrapper'>
          <div className='contact-info'>
            <h2>Contact us</h2>
            <hr />
            <p><b>Address: </b>24 Milford Rd, Milford, Auckland 0620</p>
            <p><b>Website: </b>milfordcinema.co.nz</p>
            <p><b>Tel: </b>09 456 7890</p>
            <p><b>Email: </b>info@milfordcinema.co.nz</p>
          </div>
          <div className='map'>
            <iframe
              title="Milford Cinema Address"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.9402514892604!2d174.76392891507427!3d-36.77200077995447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d39e6fd4f94b1%3A0x4dc17b0d66cfe683!2s24%20Milford%20Road%2C%20Milford%2C%20Auckland%200620%2C%20New%20Zealand!5e0!3m2!1sen!2sca!4v1649704701039!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
          </div>
        </div>
      </div>
    )
  }
}
