import { fetch_data, create_order, delete_order, fetch_user_orders } from '../services/api';

// action types
const INIT_ORDERS = 'INIT_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

// reducer
export default function orders (state, action) {
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

// thunk functions
export const fetchOrders = () => (dispatch) => fetch_data('orders', dispatch, initOrders);

export const fetchUserOrders = (userId) => (dispatch) => fetch_user_orders(userId, dispatch, initOrders);

export const addOrderAsync = (userId, order) => () => create_order(userId, order);

export const deleteOrderAsync = (userId, orderKey) => () => delete_order(userId, orderKey);
