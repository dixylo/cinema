import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default class CommentModule extends Component {
  render () {
    const movieId = this.props.movieId;
    return (
      <div className='wrapper'>
        <CommentInput movieId={movieId} />
        <CommentList movieId={movieId} />
      </div>
    );
  }
}