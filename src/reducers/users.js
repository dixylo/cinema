import { fetch_data, delete_user } from '../services/api';

const INIT_USERS = 'INIT_USERS';
const ADD_USER = 'ADD_USER';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const DELETE_USER = 'DELETE_USER';
const HIDE_MODAL = 'HIDE_MODAL';

export default function users (state, action) {
  if (!state) {
    state = {
      users: [],
      modal: {
        visibility: false,
        header: '',
        body: '',
        onOk: null
      }
    };
  }

  const { users } = state;

  switch (action.type) {
    case INIT_USERS:
      return { ...state, users: action.users };
    case ADD_USER:
      return { users: [...users, action.user], modal: action.modal };
    case CHANGE_PASSWORD:
      const { userId, password, modal } = action;
      return {
        users: [
          ...users.slice(0, userId),
          { ...users[userId], password },
          ...users.slice(userId + 1)
        ],
        modal
      };
    case DELETE_USER:
      delete users[action.userId];
      const newUsers = { ...users };
      return { ...state, users: newUsers };
    case HIDE_MODAL:
      return { ...state, modal: action.modal };
    default:
      return state;
  }
}

export const initUsers = (users) => {
  return { type: INIT_USERS, users };
};

export const addUser = (user, modal) => {
  return { type: ADD_USER, user, modal };
};

export const changePassword = (userId, password, modal) => {
  return { type: CHANGE_PASSWORD, userId, password, modal }
};

export const deleteUser = (userId) => {
  return { type: DELETE_USER, userId };
};

export const hideModal = () => {
  return { type: HIDE_MODAL, modal: { visibility: false, header: '', body: '', onOk: null } };
};

export const fetchUsers = () => (dispatch) => fetch_data('users', dispatch, initUsers);

export const deleteUserAsync = (userId) => () => delete_user(userId);
