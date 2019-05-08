import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/logo.png';

export default class Header extends Component {
  state = {
    isCollapsedMenuVisible: false
  };

  showMenu = () => {
    this.setState({ isCollapsedMenuVisible: !this.state.isCollapsedMenuVisible });
  };

  render () {
    const { hasUserLoggedIn, hasAdminLoggedIn } = this.props.loginStatus;
    return (
      <div className='header'>
        <div className='navbar-collapsed'>
          <Link className='nav-logo' to='/'>
            <img alt='icon' src={icon}/>
            <span><b>ilfordCinema</b></span>
          </Link>
          <button className='nav-button' onClick={this.showMenu}>
            <span className='tribar'></span>
            <span className='tribar'></span>
            <span className='tribar'></span>
          </button>
        </div>
        <div className={this.state.isCollapsedMenuVisible ? 'navbar-menu responsive' : 'navbar-menu'}>
          <div className='nav-feature'>
            <Link className='nav-item' to='/'>Home</Link>
            <Link className='nav-item' to='/movies'>Movies</Link>
            <Link className='nav-item' to='/about'>About</Link>
            <Link className='nav-item' to='/contact'>Find us</Link>
          </div>
          <hr className='nav-hr' />
          <div className='nav-user'>
            {hasUserLoggedIn ? (
              <Fragment>
                <Link className='nav-item' to='/login'>Log out</Link>
                <Link className='nav-item' to='/profile'>Profile</Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link className='nav-item' to='/login'>Log in</Link>
                <Link className='nav-item' to='/register'>Sign up</Link>
              </Fragment>
            )}
            {hasAdminLoggedIn && <Link className='nav-item' to='/admin'>Admin</Link>}
          </div>
        </div>
      </div>
    );
  }
}