import React, { Component } from 'react';
import Vote from './Vote';
import { formatDate } from '../utils/helpers';

class CommentItem extends Component {
  deleteComment(commentId) {
    this.props.deleteComment(commentId)
  }
  render() {
    const { comment, editComment } = this.props;
    return (
      <div>
        <span>{comment.body}</span>
        <span className="author">{comment.author}</span>
        <span>{formatDate(comment.timestamp)}</span>
        <span style={{"color": "red"}}>{comment.voteScore}</span>
        <Vote id={comment.id} match={this.props.comment}/>
        <button onClick={() => editComment()}>Edit Comment</button>
        <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
      </div>
    );
  }
}
export default CommentItem;
