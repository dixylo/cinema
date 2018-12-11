import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentModule from '../containers/CommentModule';

class Movie extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  render() {
    const { match, movies } = this.props;
    const { movieId, roomId } = match.params;
    const movie = movies.find(item => 
      item.movieId === movieId
    );

    return (
      <div className='container'>
        <div className='detail'>
          <div className='panel'>
            <img alt={movie.name} src={movie.pic} style={{width: '100%'}} />
          </div>
          <div className='metadata'>
            <p><span>Name:</span> {movie.name}</p>
            <p><span>Director:</span> {movie.directors}</p>
            <p><span>Writers:</span> {movie.writers}</p>
            <p><span>Stars:</span> {movie.stars}</p>
            <p><span>Category:</span> {movie.category}</p>
            <Link className='ticket-link' to={`/booking/${movieId}/${roomId}`}>
              Buy Ticket&#x21E8;
            </Link>
          </div>
        </div>
        <CommentModule movieId={movieId} />
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