import { load_users, add_user, place_order } from '../services/api';

const INIT_USERS = 'INIT_USERS';
const ADD_USER = 'ADD_USER';
const PLACE_ORDER = 'PLACE_ORDER';

export default function users (state, action) {
  if (!state) {
    state = {
      users: []
    };
  }

  const { users } = state;

  switch (action.type) {
    case INIT_USERS:
      return { users: action.users };
    case ADD_USER:
      users.push(action.user);
      add_user(users);
      return { users };
    case PLACE_ORDER:
      const { user, movieName, session, roomId, selectedSeats, total } = action.order;
      const order = { movieName, session, roomId, selectedSeats, total };
      return {
        users: users.map((userItem, i) => {
          if (userItem.username === user.username) {
            place_order(i, order);
            if (userItem.orders) {
              const orders = userItem.orders;
              const orderIndex = Object.keys(orders).length;
              const neworders = { ...orders, [orderIndex]: order };
              const newuseritem = {...userItem, orders: neworders};
              return newuseritem;
            } else {
              return { ...userItem, orders: { order } }
            }
          }
          return userItem;
        })
      };
    default:
      return state;
  }
}

export const initUsers = users => {
  return { type: INIT_USERS, users };
};

export const addUser = user => {
  return { type: ADD_USER, user };
};

export const placeOrder = order => {
  return { type: PLACE_ORDER, order}
}

export const fetchUsers = () => {
  return dispatch => {
    return load_users()
    .then(response => response.json())
    .then(users => dispatch(initUsers(users)));
  }
}