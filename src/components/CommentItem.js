import React, { Component } from 'react';
import * as API from '../utils/api';

class CommentItem extends Component {
  deleteComment(commentId) {

    this.props.deleteComment(commentId)
    console.log("hihihihihihihihihi")
  }
  render() {
    const { comment, editComment } = this.props;
    return (
      <div>
        <span>{comment.body}</span>
        <span className="author">{comment.author}</span>
        <span>{comment.timestamp}</span>
        <button onClick={() => editComment()}>Edit Comment</button>
        <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
      </div>
    );
  }
}
export default CommentItem;
