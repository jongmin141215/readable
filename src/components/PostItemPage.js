import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as API from '../utils/api';
import { fetchPost, fetchComments } from '../actions';
import CommentForm from './CommentForm';
import PostForm from './PostForm';
import CommentItem from './CommentItem';
import PostItemDetail from './PostItemDetail';

class PostItemPage extends Component {
  state = {
    commentFormIsOpen: false,
    editModeIsOn: false,
    commentEditModeIsOn: false,
    title: "",
    body: "",
    commentBody: "",
    selectedCommentId: ""
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id).then(({post}) => this.setState({
        title: post.title,
        author: post.author,
        body: post.body,
        category: post.category
      }))
    this.props.fetchComments(this.props.match.params.id)
  }
  updateTitle(title) {
    this.setState({ title })
  }
  updateBody(body) {
    this.setState({ body })
  }
  updateCommentBody(commentBody) {
    this.setState({ commentBody })
  }
  editComment(comment) {
    this.setState({
      commentEditModeIsOn: true,
      selectedCommentId: comment.id,
      commentBody: comment.body
    })
  }
  updateComment(event) {
    event.preventDefault();
    let comment = {
      timestamp: Date.now(),
      body: this.state.commentBody
    }
    API.updateComment(this.state.selectedCommentId, comment)
    this.setState({commentEditModeIsOn: false, selectedCommentId: ""})
    this.props.fetchComments(this.props.match.params.id)
  }
  renderComments() {
    const { comments } = this.props;

    if (comments) {
      return comments.map(comment => {
        return (
          // <CommentItem />
          <li key={comment.id}>
            {(this.state.selectedCommentId == "" || this.state.selectedCommentId != comment.id) && <p>{comment.body} - {comment.author} <button onClick={() => this.editComment(comment)}>Edit Comment</button></p>}
            {this.state.commentEditModeIsOn && this.state.selectedCommentId == comment.id &&
              <form onSubmit={event => this.updateComment(event)}>
                <input type="text" value={this.state.commentBody} onChange={event => this.updateCommentBody(event.target.value)}/>
                <button type="submit">Update Comment</button>
              </form>
            }
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
    this.setState({editModeIsOn: false })
    this.props.fetchPost(this.props.match.params.id)
  }
  renderPost(post) {
    if (!this.state.editModeIsOn) {
      return (
        <div>
          <PostItemDetail post={post}/>
          <button onClick={() => this.setState({editModeIsOn: true})}>Edit Post</button>
        </div>
      )
    } else {

      return (
        <div>
          <PostForm title={this.state.title}
            author={this.state.author}
            body={this.state.body}
            category={this.state.category}
            mode="Edit"
            postId={post.id}
            handleSubmit ={() => this.handleSubmit()}/>
        </div>
      )
    }

  }
  render() {
    const { post } = this.props
    return (
      <div>
        {this.renderPost(post)}
        <button onClick={() => this.setState({commentFormIsOpen: true})}>Add Comment</button>
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
export default connect(mapStateToProps, { fetchPost, fetchComments })(PostItemPage);
