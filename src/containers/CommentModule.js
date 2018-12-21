import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default class CommentModule extends Component {
  render () {
    const movieId = this.props.movieId;
    return (
      <div className='wrapper'>
        <h2>Comments</h2>
        <CommentInput movieId={movieId} />
        <CommentList movieId={movieId} />
      </div>
    );
  }
}