const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export default function Login (state, action) {
  if (!state) {
    state = {
      user: {
        userId: null,
        username: '',
        password: ''
      },
      hasUserLoggedIn: false,
      hasAdminLoggedIn: false
    };
  }

  switch (action.type) {
    case LOG_IN:
      return {
        user: action.user,
        hasUserLoggedIn: true,
        hasAdminLoggedIn:
          action.user.username === 'Admin'
          ? true : false
      };
    case LOG_OUT:
      return {
        user: {
          userId: null,
          username: '',
          password: ''
        },
        hasUserLoggedIn: false,
        hasAdminLoggedIn: false
      };
    default:
      return state;
  }
}

export const login = (user) => {
  return { type: LOG_IN, user };
};

export const logout = () => {
  return { type: LOG_OUT };
};