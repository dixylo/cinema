import { combineReducers } from 'redux';
import slides from './slides';
import movies from './movies';
import rooms from './rooms';
import users from './users';
import login from './login';

export default combineReducers({
  slides,
  movies,
  rooms,
  users,
  login
});