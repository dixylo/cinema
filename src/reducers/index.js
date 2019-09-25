import { combineReducers } from 'redux';
import movies from './movies';
import rooms from './rooms';
import users from './users';
import user from './user';
import comments from './comments';
import orders from './orders';

export default combineReducers({
  movies,
  rooms,
  users,
  user,
  comments,
  orders
});