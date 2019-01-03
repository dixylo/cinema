import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.string
  };

  constructor () {
    super();
    this.state = { timeString: ''};
  }

  componentWillMount () {
    this._updateTimeString();
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    );
  }

  componentWillUnmount () {
    clearInterval(this._timer);
  }

  _updateTimeString () {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.postTime) / 1000;
    let timeString = '';
    if (duration < 60) {
      timeString = `${Math.round(Math.max(duration, 1))} sec ago`;
    } else if (duration < 3600) {
      timeString = `${Math.round(duration / 60)} min ago`;
    } else if (duration < 86400) {
      timeString = `${Math.round(duration / 3600)} hr ago`;
    } else if (duration < 172800) {
      timeString = 'Yesterday';
    } else {
      const postTime = new Date(comment.postTime);
      timeString = postTime.toDateString();
    }
    this.setState({ timeString });
  }

  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render () {
    const { currentUser, comment } = this.props;
    const isCurrentUsersCommentOrAdminBrowsing
    = currentUser === comment.username || currentUser === 'Admin';
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span><b>{comment.username}</b></span>:&nbsp;
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-postTime'>
          {this.state.timeString}
        </span>
          {isCurrentUsersCommentOrAdminBrowsing &&
          <span
            onClick={this.handleDeleteComment.bind(this)}
            className='comment-delete'
          >
            Delete
          </span>}
      </div>
    );
  }
}