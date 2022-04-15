import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies } from '../reducers/movies';
import CommentModule from '../containers/CommentModule';

class Movie extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  componentDidMount () {
    const { movies, initMovies } = this.props;
    if (!movies.length) {
      initMovies();
    }
  }

  render() {
    const { match, movies } = this.props;
    const { movieId, roomId } = match.params;
    const movie = movies.find(item => item && (item.movieId === movieId));
    return (
      <div className='container'>
        <div className='metadata-comment'>
          <div className='metadata'>
            <div className='metadata-image'>
              {movie && (
                <img
                  alt={movie.name}
                  src={movie.portrait}
                />
              )}
            </div>
            {movie && (
              <div className='metadata-text'>
                <p><span>Name:</span> {movie.name}</p>
                <p><span>Director:</span> {movie.directors}</p>
                <p><span>Writers:</span> {movie.writers}</p>
                <p><span>Stars:</span> {movie.stars}</p>
                <p><span>Category:</span> {movie.category}</p>
                {movie.isOn && (
                  <Link className='ticket-link' to={`/booking/${movieId}/${roomId}`}>
                    Buy Ticket &rArr;
                  </Link>
                )}
                {movie.isComing && (
                  <p className='ticket-link'>Coming soon...</p>
                )}
              </div>
            )}
          </div>
          <div className='comment-area'>
            <CommentModule movieId={movieId} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMovies: () => dispatch(fetchMovies())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
