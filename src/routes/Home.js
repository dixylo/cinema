import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initMovies } from '../reducers/movies';
import { initSlides } from '../reducers/slides';
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

  componentDidMount () {
    this._loadPosters();
  }

  _loadPosters () {
    // Load slides
    fetch("https://cinema-react.firebaseio.com/cinema/slides.json")
    .then(response => response.json())
    .then(slides => this.props.initSlides(slides));
    // Load movies
    fetch("https://cinema-react.firebaseio.com/cinema/movies.json")
    .then(response => response.json())
    .then(movies => this.props.initMovies(movies));
  }

  render() {
    const { slides, movies } = this.props;
    return (
      <div className="home">
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

const mapDispatchToProps = (dispatch) => {
  return {
    initSlides: (slides) => {
      dispatch(initSlides(slides));
    },
    initMovies: (movies) => {
      dispatch(initMovies(movies));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);