import { load_movies } from '../services/api';

const INIT_MOVIES = 'INIT_MOVIES';

export default function movies (state, action) {
  if (!state) {
    state = {
      movies: []
    };
  }

  switch (action.type) {
    case INIT_MOVIES:
      return { movies: action.movies };
    default:
      return state;
  }
}

export const initMovies = movies => {
  return { type: INIT_MOVIES, movies };
};

export const fetchMovies = () => {
  return dispatch => {
    return load_movies()
    .then(response => response.json())
    .then(movies => dispatch(initMovies(movies)));
  }
}