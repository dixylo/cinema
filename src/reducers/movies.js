import { fetch_data, delete_movie } from '../services/api';

const INIT_MOVIES = 'INIT_MOVIES';
const DELETE_MOVIE = 'DELETE_MOVIE';

export default function movies (state, action) {
  if (!state) {
    state = {
      movies: []
    };
  }

  switch (action.type) {
    case INIT_MOVIES:
      return { movies: action.movies };
    case DELETE_MOVIE:
      delete movies[action.movieId];
      const newMovies = { ...movies };
      return { movies: newMovies };
    default:
      return state;
  }
}

export const initMovies = (movies) => {
  return { type: INIT_MOVIES, movies };
};

export const deleteMovie = (movieId) => {
  return { type: DELETE_MOVIE, movieId };
};

export const fetchMovies = () => (dispatch) => fetch_data('movies', dispatch, initMovies);

export const deleteMovieAsync = (movieId) => () => delete_movie(movieId);
