import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Movies from './routes/Movies';
import Booking from './routes/Booking';
import Movie from './routes/Movie';

class CinemaApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="bgHome"> 
          <div className='header'>
            <Link className='nav-item' to='/'>Home</Link>
            <Link className='nav-item' to='/'>Movies</Link>
            <Link className='nav-item' to='/'>About</Link>
            <Link className='nav-item' to='/'>Contact</Link>
          </div>

          <Route exact path='/' component={Movies} />
          <Route path='/booking/:movieId/:roomId' component={Booking} />
          <Route path='/movie/:movieId/:roomId' component={Movie}/>

          <div className="footer">
		        <p>&copy;&nbsp;2018 Copyright by DIXYLO&trade;. All Rights Reserved.</p>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default CinemaApp;