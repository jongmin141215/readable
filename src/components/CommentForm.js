import React, { Component } from 'react';
import * as API from '../utils/api';
const uuidv4 = require('uuid/v4');


class CommentForm extends Component {
  state = {
    body: "",
    author: ""
  }
  updateBody(body) { this.setState({ body })}
  updateAuthor(author) { this.setState({ author })}
  handleSubmit(event) {
    event.preventDefault();
    let comment = {
      timestamp: Date.now(),
      id: uuidv4(),
      parentId: this.props.postId,
      body: this.state.body,
      author: this.state.author
    }
    API.addComment(comment)
    this.props.handleCommentSubmission()
  }
  componentDidMount() {
    console.log("id", this.props)
  }
  render() {
    console.log("Comment Form Props", this.props)
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <p>Body: <input type="text" value={this.state.body} onChange={event => this.updateBody(event.target.value)} /></p>
        <p>Author: <input type="text" value={this.state.author} onChange={event => this.updateAuthor(event.target.value)} /></p>
        <button type="submit">Save Comment</button>
      </form>
    );
  }
}
export default CommentForm;
