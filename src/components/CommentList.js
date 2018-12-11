import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.object,
    onDeleteComment: PropTypes.func
  };

  static defaultProps = {
    comments: {}
  };
  
  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render () {
    const { comments, currentUser } = this.props;
    return (
      <div>
        {comments && Object.keys(comments).map((key, i) => 
        <Comment
          comment={comments[key]}
          key={i}
          index={key}
          currentUser={currentUser}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
        )}
      </div>
    );
  }
}

export default CommentList