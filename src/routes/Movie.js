import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentModule from '../containers/CommentModule';
import { queryMovie } from '../services/utils';

class Movie extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  constructor (props) {
    super(props);
    const { match, movies } = this.props;
    const { movieId, roomId } = match.params;
    const movie = movies.find(item => item && (item.movieId === movieId));
    this.state = {
      movieId,
      roomId,
      movie
    };
  }

  componentWillMount () {
    const { movieId, movie } = this.state;
    if (!movie) {
      queryMovie(movieId).then(movie => {
        this.setState({ movie })
      });
    }
  }

  render() {
    const { movieId, roomId, movie } = this.state;
    return (
      <div className='container'>
        <div className='detail'>
          <div className='panel'>
            {movie && (
              <img
                alt={movie.name}
                src={movie.portrait}
                style={{width: '100%'}}
              />
            )}
          </div>
          {movie && (
            <div className='metadata'>
              <p><span>Name:</span> {movie.name}</p>
              <p><span>Director:</span> {movie.directors}</p>
              <p><span>Writers:</span> {movie.writers}</p>
              <p><span>Stars:</span> {movie.stars}</p>
              <p><span>Category:</span> {movie.category}</p>
              {movie.isOn && (
                <Link className='ticket-link' to={`/booking/${movieId}/${roomId}`}>
                  Buy Ticket&#x21E8;
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies
  }
}

export default connect(mapStateToProps)(Movie);