import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { fetchComments, deleteCommentAsync } from '../reducers/comments';

class CommentListContainer extends Component {
  static propTypes = {
    // comments: PropTypes.object,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  };
  
  componentWillMount () {
    this.props.initComments();
  };

  handleDeleteComment (index) {
    const { movieId } = this.props;
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(movieId, index);
    }
  }

  render () {
    const { movieId, comments, currentUser } = this.props;
    return (
      <CommentList
        comments={comments[movieId]}
        currentUser={currentUser}
        onDeleteComment={this.handleDeleteComment.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    currentUser: state.login.user.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initComments: () => {
      dispatch(fetchComments())
    },
    onDeleteComment: (movieId, commentKey) => {
      dispatch(deleteCommentAsync(movieId, commentKey))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)