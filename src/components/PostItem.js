import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as API from '../utils/api';
import { fetchPost, fetchComments } from '../actions';
import CommentForm from './CommentForm';
import PostForm from './PostForm';

class PostItem extends Component {
  state = {
    commentFormIsOpen: false,
    editModeIsOn: false,
    title: "",
    body: ""
  }
  componentDidMount() {
    // console.log("id", this.props.)
    this.props.fetchPost(this.props.match.params.id).then(({post}) => this.setState({
        title: post.title,
        author: post.author,
        body: post.body,
        category: post.category
      }))
    this.props.fetchComments(this.props.match.params.id)
    // API.getComments(this.props.match.params.id).then(comments => console.log("commnents", comments))
  }
  updateTitle(title) {
    this.setState({ title })
  }
  updateBody(body) {
    this.setState({ body })
  }
  renderComments() {
    const { comments } = this.props;
    if (comments) {
      return comments.map((comment, index) => {
        return (
          <li key={index}>
            <p>{comment.body} - {comment.author}</p>
          </li>
        )
      })
    }
  }
  handleCommentSubmission() {
    this.setState({ commentFormIsOpen: false });
    this.props.fetchComments(this.props.match.params.id)
  }
  handleSubmit(event) {
    event.preventDefault();
    let post = {
      title: this.state.title,
      body: this.state.body
    }
    API.editPost(this.props.match.params.id, post)
    this.setState({editModeIsOn: false })
    this.props.fetchPost(this.props.match.params.id)
  }
  renderPost(post) {
    if (!this.state.editModeIsOn) {
      return (
        <div>
          <div><div className="inline-block post-margin">{post.category}</div><div className="inline-block post-margin">{post.title}</div><div className="inline-block post-margin">{post.voteScore}</div><button onClick={() => this.setState({editModeIsOn: true})}>Edit Post</button></div>
            <div className="post-margin">{post.author} - {post.timestamp}</div>
            <div className="post-margin">{post.body}</div>
          <button onClick={() => this.setState({commentFormIsOpen: true})}>Add Comment</button>
        </div>
      )
    } else {

      return (
        // may be able to use <PostForm /> to avoid duplication

        <form onSubmit={(event) => this.handleSubmit(event)}>
          Category:
          <select disabled>
            <option value={this.state.category}>{this.state.category}</option>
          </select>
          Title: <input type="text" value={this.state.title} onChange={event => this.updateTitle(event.target.value)} />
          Author: <input type="text" value={this.state.author} disabled />
          Body: <input type="text" value={this.state.body} onChange={event => this.updateBody(event.target.value)} />
          <button type="submit">Update Post</button>
        </form>
      )
    }

  }
  render() {
    console.log("editModeIsOn", this.state.editModeIsOn)
    console.log("post item prop", this.props)
    console.log("this.state", this.state)
    const { post } = this.props
    return (
      <div>
        {this.renderPost(post)}
        {this.state.commentFormIsOpen && <CommentForm postId={this.props.match.params.id} handleCommentSubmission={() => this.handleCommentSubmission()} />}
        <ul>
          {this.renderComments()}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.post,
    comments: state.comments
  }
}
export default connect(mapStateToProps, { fetchPost, fetchComments })(PostItem);
