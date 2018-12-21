import { load_comments, add_comment, delete_comment } from '../services/api';

// action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// reducer
export default function (state, action) {
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
      delete comments[action.movieId][action.commentKey];
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

export const deleteComment = (movieId, commentKey) => {
  return { type: DELETE_COMMENT, movieId, commentKey };
};

export const fetchComments = () => {
  return (dispatch) => {
    return load_comments()
      .then(response => response.json())
      .then(comments => dispatch(initComments(comments)));
  };
};

export const addCommentAsync = (movieId, comment) => {
  return (dispatch) => {
    return add_comment(movieId, comment)
      .then(response => response.json())
      .then(key => dispatch(addComment(movieId, key, comment)));
  };
};

export const deleteCommentAsync = (movieId, commentKey) => {
  return (dispatch) => {
    return delete_comment(movieId, commentKey).then(
      (response) => {
        if (response.status === 200) {
          dispatch(deleteComment(movieId, commentKey));
        }
      }
    );
  }
}