import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.object,
    onCommentDelete: PropTypes.func
  };

  static defaultProps = {
    comments: {}
  };
  
  handleCommentDelete (index) {
    if (this.props.onCommentDelete) {
      this.props.onCommentDelete(index);
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
          onCommentDelete={this.handleCommentDelete.bind(this)}
        />
        )}
      </div>
    );
  }
}

export default CommentList
