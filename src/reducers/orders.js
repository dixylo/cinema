import { load_orders, add_order, delete_order } from '../services/api';

// action types
const INIT_ORDERS = 'INIT_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

// reducer
export default function (state, action) {
  if (!state) {
    state = { orders: {} }
  }

  const { orders } = state;

  switch (action.type) {
    case INIT_ORDERS:
      return { orders: action.orders };
    case ADD_ORDER:
      return {
        orders: {
          ...orders, [action.userId]: {
            ...orders[action.userId], [action.key.name]: action.order
          }
        }
      };
    case DELETE_ORDER:
      delete orders[action.userId][action.orderKey];
      const newOrders = { ...orders };
      return { orders: newOrders };
    default:
      return state;
  }
}

// action creators
export const initOrders = (orders) => {
  return { type: INIT_ORDERS, orders };
};

export const addOrder = (userId, key, order) => {
  return { type: ADD_ORDER, userId, key, order };
};

export const deleteOrder = (userId, orderKey) => {
  return { type: DELETE_ORDER, userId, orderKey };
};

export const fetchOrders = () => {
  return dispatch => {
    return load_orders()
      .then(response => response.json())
      .then(orders => dispatch(initOrders(orders)))
      .catch(ex => console.log(ex.message));
  };
};

export const addOrderAsync = (userId, order) => {
  return (dispatch) => {
    return add_order(userId, order)
      .then(response => response.json())
      .then(key => dispatch(addOrder(userId, key, order)))
      .catch(ex => console.log(ex.message));
  };
};

export const deleteOrderAsync = (userId, orderKey) => {
  return (dispatch) => {
    return delete_order(userId, orderKey).then(
      (response) => {
        if (response.status === 200) {
          dispatch(deleteOrder(userId, orderKey));
        }
      }
    ).catch(ex => console.log(ex.message));
  }
}