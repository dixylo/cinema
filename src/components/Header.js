import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import icon from '../assets/logo.png';

export default class Header extends Component {
  state = {
    isCollapsedMenuVisible: false
  };

  toggleMenu = () => {
    this.setState({ isCollapsedMenuVisible: !this.state.isCollapsedMenuVisible });
  };

  closeMenu = () => {
    this.setState({ isCollapsedMenuVisible: false });
  };

  render () {
    const { hasUserLoggedIn, hasAdminLoggedIn } = this.props.loginStatus;
    return (
      <div className='header'>
        <div className='navbar-wrapper'>
          <div className='navbar-collapsed'>
            <Link className='nav-logo' to='/'>
              <img alt='icon' src={icon}/>
              <span><b>ilfordCinema</b></span>
            </Link>
            <button className='nav-button' onClick={this.toggleMenu}>
              <div className={classNames({ 'bar-one': true, cross: this.state.isCollapsedMenuVisible })}></div>
              <div className={classNames({ 'bar-two': true, cross: this.state.isCollapsedMenuVisible })}></div>
              <div className={classNames({ 'bar-three': true, cross: this.state.isCollapsedMenuVisible })}></div>
            </button>
          </div>
          <div
            className={classNames({ 'navbar-menu': true, responsive: this.state.isCollapsedMenuVisible })}
            onClick={this.closeMenu}
          >
            <div className='nav-feature'>
              <Link className='nav-item' to='/'>Home</Link>
              <Link className='nav-item' to='/movies'>Movies</Link>
              <Link className='nav-item' to='/about'>About</Link>
              <Link className='nav-item' to='/contact'>Find us</Link>
            </div>
            <hr className='nav-hr' />
            <div className='nav-user'>
              {hasAdminLoggedIn && <Link className='nav-item' to='/admin'>Admin</Link>}
              {hasUserLoggedIn ? (
                <Fragment>
                  <Link className='nav-item' to='/profile'>Profile</Link>
                  <Link className='nav-item' to='/login'>Log out</Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Link className='nav-item' to='/login'>Log in</Link>
                  <Link className='nav-item' to='/register'>Sign up</Link>
                </Fragment>
              )}
            </div>
          </div>
        </div>  
      </div>
    );
  }
}