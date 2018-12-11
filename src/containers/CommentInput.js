import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import { addCommentAsync } from '../reducers/comments';

class CommentInputContainer extends Component {
  static propTypes = {
    // comments: PropTypes.array,
    onSubmit: PropTypes.func
  };

  handleSubmitComment (comment) {
    const { currentUser, movieId, onSubmit } = this.props;
    if (!currentUser.hasLoggedIn) {
      alert("Please log in to comment.");
      return;
    }
    if (!comment) return;
    if (!comment.username) return alert('Please enter username');
    if (!comment.content) return alert('Please enter comment');
    onSubmit(movieId, comment);
  }

  render () {
    return (
      <CommentInput
        username={this.props.currentUser.user.username}
        onSubmit={this.handleSubmitComment.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    currentUser: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (movieId, comment) => {
      dispatch(addCommentAsync(movieId, comment));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)