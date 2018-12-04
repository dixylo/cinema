const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export default function Login (state, action) {
  if (!state) {
    state = {
      user: {
        username: '',
        password: ''
      },
      hasLoggedIn: false
    };
  }

  switch (action.type) {
    case LOG_IN:
      return {
        user: action.user,
        hasLoggedIn: true
      };
    case LOG_OUT:
      return {
        user: {
          username: '',
          password: ''
        },
        hasLoggedIn: false
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