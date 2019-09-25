import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import Card from '../components/Card';

class Home extends Component {
  static propTypes = {
    movies: PropTypes.array,
    initMovies: PropTypes.func
  }

  static defaultProps = {
    movies: []
  }

  render() {
    const { movies } = this.props;
    const slides = movies.filter(movie => movie && movie.isComing);
    const showingMovies = movies.filter(movie => movie && movie.isOn);
    return (
      <div className="container">
        <Carousel slides={slides} />
        <h1>Now Showing</h1>
        <hr />
        <div className='movies'>
          {showingMovies.map((movie, i) => movie && <Card key={i} {...movie} />)}
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

export default connect(mapStateToProps)(Home);