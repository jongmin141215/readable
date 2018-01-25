import React, { Component } from 'react';

class CommentItem extends Component {
  render() {
    const { comment, editComment } = this.props;
    return (
      <div>
        <span>{comment.body}</span>
        <span className="author">{comment.author}</span>
        <span>{comment.timestamp}</span>
        <button onClick={() => editComment()}>Edit Comment</button>
      </div>
    );
  }
}
export default CommentItem;
