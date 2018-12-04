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
      const jsonUsers = JSON.stringify({ users });
      fetch("https://cinema-react.firebaseio.com/cinema.json", {
        method: 'PATCH',
        body: jsonUsers
      }).then(response => console.log(response.status)).catch(err => console.log(err));
      return { users };
    case PLACE_ORDER:
      const { user, movieName, session, roomId, selectedSeats, total } = action.order;
      const order = { movieName, session, roomId, selectedSeats, total };
      const jsonOrder = JSON.stringify(order);
      return {
        users: users.map((userItem, i) => {
          if (userItem.username === user.username) {
            if (userItem.orders) {
              const orders = userItem.orders;
              const orderIndex = Object.keys(orders).length;
              const neworders = { ...orders, [orderIndex]: order };
              const newuseritem = {...userItem, orders: neworders};
              fetch(`https://cinema-react.firebaseio.com/cinema/users/${i}/orders.json`, {
                method: 'POST',
                body: jsonOrder
              }).then(response => console.log(response.status)).catch(err => console.log(err));
              return newuseritem;
            } else {
              fetch(`https://cinema-react.firebaseio.com/cinema/users/${i}/orders.json`, {
                method: 'POST',
                body: jsonOrder
              }).then(response => console.log(response.status)).catch(err => console.log(err));
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

export const initUsers = (users) => {
  return { type: INIT_USERS, users };
};

export const addUser = (user) => {
  return { type: ADD_USER, user };
};

export const placeOrder = (order) => {
  return { type: PLACE_ORDER, order}
}