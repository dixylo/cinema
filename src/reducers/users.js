import { load_users, add_user, change_password } from '../services/api';

const INIT_USERS = 'INIT_USERS';
const ADD_USER = 'ADD_USER';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

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
      return { users: [...users, action.user] };
    case CHANGE_PASSWORD:
      const { userId, password } = action;
      return {
        users: [
          ...users.slice(0, userId),
          { ...users[userId], password },
          ...users.slice(userId + 1)
        ]
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

export const changePassword = (userId, password) => {
  return { type: CHANGE_PASSWORD, userId, password }
};

export const fetchUsers = () => {
  return (dispatch) => {
    return load_users()
    .then(response => response.json())
    .then(users => dispatch(initUsers(users)));
  }
};

export const addUserAsync = (user) => {
  return (dispatch) => {
    return add_user(user).then(
      response => {
        if (response.status === 200) {
          dispatch(addUser(user));
          alert('Signup Succeeded. You may log in to reserve a seat and leave a comment');
        }
      }
    );
  };
};

export const changePasswordAsync = (userId, password) => {
  return (dispatch) => {
    return change_password(userId, password).then(
      response => {
        if (response.status === 200) {
          dispatch(changePassword(userId, password));
          alert('Password Changed Successfully!');
        }
      }
    );
  };
};