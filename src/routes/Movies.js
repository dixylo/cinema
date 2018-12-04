import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '../components/Card';
import '../index.css';

class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  render() {
    return (
      <div className='container'>
        <div className='movies'>
          {this.props.movies.map((movie, i) => <Card key={i} {...movie} />)}
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