import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as API from '../utils/api';
import { fetchPost, fetchComments } from '../actions';
import CommentForm from './CommentForm';
import PostForm from './PostForm';
import CommentItem from './CommentItem';
import PostItemDetail from './PostItemDetail';
import Vote from './Vote';

class PostItemPage extends Component {
  state = {
    commentFormIsOpen: false,
    editModeIsOn: false,
    commentEditModeIsOn: false,
    title: "",
    body: "",
    selectedCommentId: "",
    commentDeleted: false,
    fireRedirect: false
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
  editComment(comment) {
    this.setState({
      commentEditModeIsOn: true,
      selectedCommentId: comment.id,
      commentBody: comment.body
    })
  }
  updateComment(event) {
    this.props.fetchComments(this.props.match.params.id).then(
      () => this.setState({commentEditModeIsOn: false, selectedCommentId: ""})
    )
  }
  deleteComment(commentId) {
    console.log("STATE", this.state)
    API.deleteComment(commentId).then(() => {
      this.props.fetchComments(this.props.match.params.id)
      this.setState({commentDeleted: true})
    })
  }
  renderComments() {
    const { comments } = this.props;
    const { selectedCommentId, commentEditModeIsOn, commentBody } = this.state;

    if (comments) {
      return comments.map(comment => {
        return (
          <li key={comment.id}>
            {(selectedCommentId === "" || selectedCommentId !== comment.id) &&
              <CommentItem comment={comment}
                editComment={() => this.editComment(comment)}
                deleteComment={(commentId) => this.deleteComment(commentId)} />}
            {commentEditModeIsOn && selectedCommentId === comment.id &&
              <CommentForm mode="Edit"
                body={comment.body}
                commentId={comment.id}
                author={comment.author}
                updateComment={() => this.updateComment()} />
            }
          </li>
        )
      })
    }
  }
  handleCommentSubmit() {
    this.setState({ commentFormIsOpen: false });
    this.props.fetchComments(this.props.match.params.id)
  }
  handleSubmit(event) {
    this.setState({editModeIsOn: false })
    this.props.fetchPost(this.props.match.params.id)
  }
  deletePost(postId) {
    API.deletePost(postId).then(() => this.setState({fireRedirect: true}))
  }
  renderPost(post) {
    const { editModeIsOn, title, author, body, category } = this.state;
    if (!editModeIsOn) {
      return (
        <div>
          <PostItemDetail post={post}/>
          <Vote id={post.id} />
          <button onClick={() => this.setState({editModeIsOn: true})}>Edit Post</button>
          <button onClick={() => this.deletePost(post.id)}>Delete Post</button>
        </div>
      )
    } else {
      return (
        <div>
          <PostForm mode="Edit"
            title={title}
            author={author}
            body={body}
            category={category}
            postId={post.id}
            handleSubmit ={() => this.handleSubmit()} />
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
        {this.state.commentFormIsOpen && <CommentForm postId={this.props.match.params.id} handleCommentSubmit={() => this.handleCommentSubmit()} />}
        <ul>
          {this.renderComments()}
        </ul>
        {this.state.fireRedirect && <Redirect to="/" />}
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
