import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
import Movies from './routes/Movies';
import Booking from './routes/Booking';
import Movie from './routes/Movie';
import About from './routes/About';
import Contact from './routes/Contact';

class CinemaApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="bgHome"> 
          <div className='header'>
            <Link className='nav-item' to='/'>Home</Link>
            <Link className='nav-item' to='/movies'>Movies</Link>
            <Link className='nav-item' to='/about'>About</Link>
            <Link className='nav-item' to='/contact'>Find us</Link>
          </div>

          <Route exact path='/' component={Home} />
          <Route exact path='/movies' component={Movies} />
          <Route path='/booking/:movieId/:roomId' component={Booking} />
          <Route path='/movie/:movieId/:roomId' component={Movie}/>
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />

          <div className="footer">
		        <p>&copy;&nbsp;2018 Copyright by DIXYLO&trade;. All Rights Reserved.</p>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default CinemaApp;