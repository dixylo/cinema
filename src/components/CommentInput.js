import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CommentInput extends Component {
  static propTypes = {
    currentUser: PropTypes.any,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func
  };

  static defaultProps = {
    currentUser: null
  };

  constructor (props) {
    super(props);
    this.state = {
      username: props.currentUser.username,
      uid: props.currentUser.userId,
      content: ''
    };
  }

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit () {
    const { username, uid, content } = this.state;
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username,
        uid,
        content,
        postTime: +new Date()
      });
    }
    this.setState({ content: '' });
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'><b>Username: </b></span>
          <div className='comment-field-input'>
            <input 
              value={this.state.username}
              disabled
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'><b>Comment: </b></span>
          <div className='comment-field-input'>
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            Post
          </button>
        </div>
      </div>
    );
  }
}
