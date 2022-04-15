import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import Modal from '../components/Modal';
import { addCommentAsync } from '../reducers/comments';

class CommentInputContainer extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  state = {
    isModalVisible: false,
    modalHeader: '',
    modalBody: ''
  };

  handleCommentSubmit (comment) {
    const { currentUser, movieId, onSubmit } = this.props;
    if (!currentUser.hasUserLoggedIn) return this.showModal('Permission Needed', 'Please log in to comment.');
    if (!comment) return;
    if (!comment.username) return this.showModal('Invalid Post', 'Please enter a username.');
    if (!comment.content) return this.showModal('Invalid Post', 'Please enter a comment.');;
    onSubmit(movieId, comment);
  }

  showModal = (header, body) => {
    this.setState({
      isModalVisible: true,
      modalHeader: header,
      modalBody: body
    });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  render () {
    return (
      <div>
        <CommentInput
          currentUser={this.props.currentUser.user}
          onSubmit={this.handleCommentSubmit.bind(this)}
        />
        <Modal 
          visibility={this.state.isModalVisible}
          onOk={this.handleOk}
          header={this.state.modalHeader}
          body={this.state.modalBody}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    currentUser: state.user
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
