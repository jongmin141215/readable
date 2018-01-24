import React, { Component } from 'react';

class CommentItem extends Component {
  render() {
    const { comment, selectedCommentId, commentEditModeIsOn } = this.props;
    return (
      <li key={comment.id}>
        {(selectedCommentId == "" || selectedCommentId != comment.id) && <p>{comment.body} - {comment.author} <button onClick={() => this.editComment(comment)}>Edit Comment</button></p>}
        {commentEditModeIsOn && selectedCommentId == comment.id &&
          <form onSubmit={event => this.updateComment(event)}>
            <input type="text" value={this.state.commentBody} onChange={event => this.updateCommentBody(event.target.value)}/>
            <button type="submit">Update Comment</button>
          </form>
        }
      </li>
    );
  }
}

export default CommentItem;
