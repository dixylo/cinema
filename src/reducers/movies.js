import { load_movies, delete_movie } from '../services/api';

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

export const fetchMovies = () => {
  return dispatch => {
    return load_movies()
    .then(response => response.json())
    .then(movies => dispatch(initMovies(movies)))
    .catch(ex => console.log(ex.message));
  }
}

export const deleteMovieAsync = (movieId) => {
  return (dispatch) => {
    return delete_movie(movieId).then(
      (response) => {
        if (response.status === 200) {
          dispatch(deleteMovie(movieId));
        }
      }
    ).catch(ex => console.log(ex.message));
  }
}