import { load_users, add_user, change_password, delete_user } from '../services/api';

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

export const fetchUsers = () => {
  return (dispatch) => {
    return load_users()
    .then(response => response.json())
    .then(users => dispatch(initUsers(users)))
    .catch(ex => console.log(ex.message));
  }
};

export const addUserAsync = (user) => {
  return (dispatch) => {
    return add_user(user).then(
      response => {
        if (response.status === 200) {
          const modal = {
            visibility: true,
            header: 'Signup Successful',
            body: 'You may log in to reserve seats and leave comments.',
            onOk: () => dispatch(hideModal())
          };
          dispatch(addUser(user, modal));
        }
      }
    ).catch(ex => console.log(ex.message));
  };
};

export const changePasswordAsync = (userId, password) => {
  return (dispatch) => {
    return change_password(userId, password).then(
      (response) => {
        if (response.status === 200) {
          const modal = {
            visibility: true,
            header: 'Password Reset',
            body: 'You have reset your password successfully.',
            onOk: () => dispatch(hideModal())
          };
          dispatch(changePassword(userId, password, modal));
        }
      }
    ).catch(ex => console.log(ex.message));
  };
};

export const deleteUserAsync = (userId) => {
  return (dispatch) => {
    return delete_user(userId).then(
      (response) => {
        if (response.status === 200) {
          dispatch(deleteUser(userId));
        }
      }
    ).catch(ex => console.log(ex.message));
  }
}