import { combineReducers } from 'redux';
import slides from './slides';
import movies from './movies';
import rooms from './rooms';

export default combineReducers({
  slides,
  movies,
  rooms
});