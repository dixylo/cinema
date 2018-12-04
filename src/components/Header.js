import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';

export default class Header extends Component {
  render () {
    return (
      <div className='header'>
        <Link className='nav-item' to='/'><img alt='icon' src={icon}/><span><i>ilfordCinema</i></span></Link>
        <Link className='nav-item' to='/'>Home</Link>
        <Link className='nav-item' to='/movies'>Movies</Link>
        <Link className='nav-item' to='/about'>About</Link>
        <Link className='nav-item' to='/contact'>Find us</Link>
        {
          this.props.hasLoggedIn ? (
            <Fragment>
              <Link className='nav-item nav-user' to='/login'>Log out</Link>
              <Link className='nav-item nav-user' to='/profile'>Profile</Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link className='nav-item nav-user' to='/login'>Log in</Link>
              <Link className='nav-item nav-user' to='/register'>Sign up</Link>
            </Fragment>
          )
        }
      </div>
    );
  }
}