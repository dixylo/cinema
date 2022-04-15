import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, updateProfile, fetchSignInMethodsForEmail } from 'firebase/auth';

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

export default function Login (state, action) {
  if (!state) {
    state = {
      user: {
        userId: null,
        username: '',
        email: ''
      },
      hasUserLoggedIn: false,
      hasAdminLoggedIn: false,
      modal: {
        visibility: false,
        header: '',
        body: '',
        onOk: null
      }
    };
  }

  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.user,
        hasUserLoggedIn: true,
        hasAdminLoggedIn:
          action.user.username === 'Admin'
          ? true : false,
        modal: action.modal
      };
    case LOG_OUT:
      return {
        ...state,
        user: {
          userId: null,
          username: '',
        },
        hasUserLoggedIn: false,
        hasAdminLoggedIn: false,
        modal: action.modal
      };
    case SHOW_MODAL:
      return { ...state, modal: action.modal };
    case HIDE_MODAL:
      return { ...state, modal: action.modal };
    default:
      return state;
  }
}

const loginSync = (user, modal) => {
  return { type: LOG_IN, user, modal };
};

const logoutSync = modal => {
  return { type: LOG_OUT, modal };
};

const showModal = modal => {
  return { type: SHOW_MODAL, modal };
}

const hideModal = () => {
  return { type: HIDE_MODAL, modal: { visibility: false, header: '', body: '', onOk: null } };
};

export const login = (user, callback) => {
  return dispatch => {
    const { email, password } = user;
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then(userInfo => {
        const { uid, displayName, email } = userInfo.user;
        const modal = {
          visibility: true,
          header: 'Login Successful',
          body: 'You may reserve seats and leave comments now.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(loginSync({
          userId: uid,
          username: displayName,
          email
        }, modal));
      })
      .catch(err => {
        console.log(err.message);
        const modal = {
          visibility: true,
          header: 'Login Failed',
          body: 'Your email or password is incorrect.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(showModal(modal));
      })
      .finally(() => callback && callback());
  };
};

export const logout = (callback) => {
  return dispatch => {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
        const modal = {
          visibility: true,
          header: 'Logout Successful',
          body: 'You may log in again to reserve seats and leave comments.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(logoutSync(modal));
      })
      .catch(err => {
        console.log(err.message);
        const modal = {
          visibility: true,
          header: 'Logout Failed',
          body: 'Something went wrong when you logged out.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(showModal(modal));
      })
      .finally(() => callback && callback());
  };
};

export const signup = (user, callback) => {
  return dispatch => {
    const { username, email, password } = user;
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => updateProfile(auth.currentUser, {
        displayName: username
      }))
      .then(() => {
        const modal = {
          visibility: true,
          header: 'Signup Successful',
          body: 'You may reserve seats and leave comments now.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(loginSync({
          userId: user.uid,
          username,
          email
        }, modal));
      })
      .catch(err => {
        console.log(err.message);
        const modal = {
          visibility: true,
          header: 'Signup Failed',
          body: 'Something went wrong when you signed up.',
          onOk: () => dispatch(hideModal())
        };
        dispatch(showModal(modal));
      })
      .finally(() => callback && callback());
  };
};

export const checkEmailValidity = email => {
  const auth = getAuth();
  return fetchSignInMethodsForEmail(auth, email)
    .then(methods => {
      if (methods.length !== 0)
        return Promise.resolve(false);

      return Promise.resolve(true);
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const changePassword = (newPassword) => {
  return (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    return updatePassword(user, newPassword).then(() => {
      const modal = {
        visibility: true,
        header: 'Password Updated',
        body: 'Please log in with your new password next time.',
        onOk: () => dispatch(hideModal())
      };
      dispatch(showModal(modal));
    }).catch((error) => {
      console.log(error);
      const modal = {
        visibility: true,
        header: 'Password Update Failed',
        body: 'Please retry later.',
        onOk: () => dispatch(hideModal())
      };
      dispatch(showModal(modal));
    });
  };
};
