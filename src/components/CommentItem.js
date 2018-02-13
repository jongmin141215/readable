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
      <div className="comment-container">
        <table className="comment-table">
          <tbody>
            <tr>
              <td className="comment-body">{comment.body}</td>
              <td>{comment.voteScore}<span className="small">votes</span></td>
            </tr>
            <tr><td className="small">{comment.author} at {formatDate(comment.timestamp)}</td></tr>
            <tr><td><Vote id={comment.id} match={this.props.comment}/></td></tr>
          </tbody>
        </table>
        <button onClick={() => editComment()}>Edit Comment</button>
        <button onClick={() => this.deleteComment(comment.id)}>Delete Comment</button>
      </div>
    );
  }
}
export default CommentItem;
