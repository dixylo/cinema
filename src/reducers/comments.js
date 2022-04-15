import { fetch_data, create_comment, delete_comment } from '../services/api';

// action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// reducer
export default function comments (state, action) {
  if (!state) {
    state = { comments: {} }
  }

  const { comments } = state;

  switch (action.type) {
    case INIT_COMMENTS:
      return { comments: action.comments };
    case ADD_COMMENT:
      return {
        comments: {
          ...comments, [action.movieId]: {
            ...comments[action.movieId], [action.key.name]: action.comment
          }
        }
      };
    case DELETE_COMMENT:
      delete comments[action.movieId][action.commentId];
      const newComments = { ...comments };
      return { comments: newComments };
    default:
      return state;
  }
}

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments };
};

export const addComment = (movieId, key, comment) => {
  return { type: ADD_COMMENT, movieId, key, comment };
};

export const deleteComment = (movieId, commentId) => {
  return { type: DELETE_COMMENT, movieId, commentId };
};

// thunk functions
export const fetchComments = () => (dispatch) => fetch_data('comments', dispatch, initComments);

export const addCommentAsync = (movieId, comment) => () => create_comment(movieId, comment);

export const deleteCommentAsync = (movieId, commentId) => () => delete_comment(movieId, commentId);
