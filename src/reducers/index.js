import { combineReducers } from 'redux';
import movies from './movies';
import rooms from './rooms';

export default combineReducers({
  movies,
  rooms
});