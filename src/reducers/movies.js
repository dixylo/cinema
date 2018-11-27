const INIT_MOVIES = 'INIT_MOVIES';

export default function movies (state, action) {
  if (!state) {
    state = {
      movies: []
    };
  }

  switch (action.type) {
    case INIT_MOVIES:
      // Initialize movies
      return { movies: action.movies };
    default:
      return state;
  }
}

export const initMovies = (movies) => {
  return { type: INIT_MOVIES, movies };
};