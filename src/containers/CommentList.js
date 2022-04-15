import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { fetchComments, deleteCommentAsync } from '../reducers/comments';
import Modal from '../components/Modal';

class CommentListContainer extends Component {
  static propTypes = {
    initComments: PropTypes.func,
    onCommentDelete: PropTypes.func
  };

  state = {
    isModalVisible: false,
    modalHeader: '',
    modalBody: '',
    modalCallbackOnOk: null,
    modalCallbackOnCancel: null
  };
  
  componentDidMount () {
    this.props.initComments();
  };

  handleCommentDelete = index => {
    const { movieId, onCommentDelete } = this.props;

    this.showModal(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      () => {
        this.setState({ isModalVisible: false });
        onCommentDelete && onCommentDelete(movieId, index);
      },
      () => this.setState({ isModalVisible: false })
    )
  };

  showModal = (header, body, callbackOnOk, callbackOnCancel) => {
    this.setState({
      isModalVisible: true,
      modalHeader: header,
      modalBody: body,
      modalCallbackOnOk: callbackOnOk,
      modalCallbackOnCancel: callbackOnCancel
    });
  };

  render () {
    const { movieId, comments, currentUser } = this.props;
    return (
      <div>
        <CommentList
          comments={comments[movieId]}
          currentUser={currentUser}
          onCommentDelete={this.handleCommentDelete}
        />
        <Modal
          visibility={this.state.isModalVisible}
          onOk={this.state.modalCallbackOnOk}
          onCancel={this.state.modalCallbackOnCancel}
          header={this.state.modalHeader}
          body={this.state.modalBody}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    currentUser: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initComments: () => {
      dispatch(fetchComments())
    },
    onCommentDelete: (movieId, commentKey) => {
      dispatch(deleteCommentAsync(movieId, commentKey))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)
