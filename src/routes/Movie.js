import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Movie extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  render() {
    const { match, movies } = this.props;
    const { movieId, roomId } = match.params;
    const theMovies = movies.filter(item => 
      item.movieId === parseInt(movieId, 10)
    );
    const movie = theMovies[0];

    return (
      <div className='container'>
        <div className='panel'>
          <img alt={movie.name} src={movie.pic} style={{width: '100%'}} />
        </div>
        <div className='panel detail'>
          <h3>Name: {movie.name}</h3>
          <hr/>
          <h3>Director: {movie.directors}</h3>
          <hr/>
          <h3>Writers: {movie.writers}</h3>
          <hr/>
          <h3>Stars: {movie.stars}</h3>
          <hr/>
          <h3>Category: {movie.category}</h3>
          <hr/>
          <Link className='nav-item' to={`/booking/${movieId}/${roomId}`}>
            <button>Buy Ticket</button>
          </Link>
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