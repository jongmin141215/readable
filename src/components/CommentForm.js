import React, { Component } from 'react';
import * as API from '../utils/api';
const uuidv4 = require('uuid/v4');

class CommentForm extends Component {
  state = {
    body: this.props.body || "",
    author: this.props.author || ""
  }
  updateBody(body) { this.setState({ body })}
  updateAuthor(author) { this.setState({ author })}

  handleSubmit(event) {
    const { mode, commentId, postId, updateComment, handleCommentSubmit } = this.props;
    const { body, author } = this.state;
    event.preventDefault();
    if (mode === "Edit") {
      let comment = {
        timestamp: Date.now(),
        body
      }
      API.updateComment(commentId, comment);
      updateComment();
    } else {
      let comment = {
        timestamp: Date.now(),
        id: uuidv4(),
        parentId: postId,
        body,
        author
      }
      API.addComment(comment)
      handleCommentSubmit()
    }
  }
  handleCancel() {
    if (this.props.mode === "Edit") {
      this.props.handleCancel();
    } else {
      this.props.closeCommentForm();
    }
  }
  render() {
    const { body, author } = this.state;
    const editMode = this.props.mode === "Edit" ? true : false;

    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className="comment-container">
        <table className="form">
          <tbody>
            <tr>
              <th>Body</th>
              <td>
                <input type="text" value={body} onChange={event => this.updateBody(event.target.value)} required />
              </td>
            </tr>
            <tr>
              <th>Author</th>
              <td>
                <input type="text"
                  value={author}
                  onChange={event => this.updateAuthor(event.target.value)}
                  disabled={editMode} required />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">{editMode ? "Update Comment" : "Save Comment"}</button>
        <button type="button" onClick={() => this.handleCancel()}>Cancel</button>
      </form>
    );
  }
}
export default CommentForm;
