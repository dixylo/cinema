import React, { Component }from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthRoute extends Component {
  hasUserLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== null;
  }

  render() {
    const {component: Component, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render={ props =>  this.hasUserLoggedIn()
          ? ( <Component {...props} /> )
          : ( <Redirect to={{pathname: '/login', state: {from: props.location}}} /> )
        }
      />
    );
  }
}