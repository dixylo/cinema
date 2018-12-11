import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import { Card } from '../components/Card';
import '../index.css';

class Home extends Component {
  static propTypes = {
    slides: PropTypes.array,
    movies: PropTypes.array,
    initSlides: PropTypes.func,
    initMovies: PropTypes.func
  }

  static defaultProps = {
    slides: [],
    movies: []
  }

  render() {
    const { slides, movies } = this.props;
    return (
      <div className="container">
        <Carousel slides={slides} />
        <h1>Now Showing</h1>
        <div className='movies'>
          <hr/>
          {movies.map((movie, i) => <Card key={i} {...movie} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    slides: state.slides.slides,
    movies: state.movies.movies
  };
};

export default connect(mapStateToProps)(Home);