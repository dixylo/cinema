import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '../components/Card';

class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  render() {
    return (
      <div className='container' style={{paddingTop:'10px'}}>
        <h1>Now Showing</h1>
        <div className='movies'>
          <hr />
          {this.props.movies.map((movie, i) => movie && movie.isOn && <Card key={i} {...movie} />)}
        </div>
        <h1>Coming Soon</h1>
        <div className='movies'>
          <hr />
          {this.props.movies.map((movie, i) => movie && movie.isComing && <Card key={i} {...movie} />)}
        </div>
        <h1>Classic Review</h1>
        <div className='movies'>
          <hr />
          {this.props.movies.map((movie, i) => movie && !movie.isOn && !movie.isComing && <Card key={i} {...movie} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies
  };
}

export default connect(mapStateToProps)(Movies);