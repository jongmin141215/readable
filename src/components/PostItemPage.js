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
    postDeleted: false,
    title: "",
    body: "",
    selectedCommentId: "",
    commentDeleted: false,
    fireRedirect: false,
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id).then(({post}) => {
      if (Object.keys(post).length === 0 && post.constructor === Object) {
        this.setState({postDeleted: true})
      } else {
        this.setState({
            title: post.title,
            author: post.author,
            body: post.body,
            category: post.category
        })
      }
    })
    this.props.fetchComments(this.props.match.params.id)
    if (this.props.location.state) {
      this.setState({editModeIsOn: true})
      this.renderPost(this.props.location.state.selectedPost)
    }
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
    API.deleteComment(commentId).then(() => {
      this.props.fetchComments(this.props.match.params.id)
      this.setState({commentDeleted: true})
    })
  }
  renderComments() {
    const { comments } = this.props;
    const { selectedCommentId, commentEditModeIsOn } = this.state;

    if (comments) {
      return comments.map(comment => {
        return (
          <li key={comment.id} className="comment-item">
            {(selectedCommentId === "" || selectedCommentId !== comment.id) &&
              <CommentItem comment={comment}
                editComment={() => this.editComment(comment)}
                deleteComment={(commentId) => this.deleteComment(commentId)} />}
            {commentEditModeIsOn && selectedCommentId === comment.id &&
              <CommentForm mode="Edit"
                body={comment.body}
                commentId={comment.id}
                author={comment.author}
                updateComment={() => this.updateComment()}
                handleCancel={() => this.setState({commentEditModeIsOn: false, selectedCommentId: ""})}/>
            }
          </li>
        )
      })
    }
  }
  handleCommentSubmit() {
    this.props.fetchComments(this.props.match.params.id).then(
      () => {
        this.setState({ commentFormIsOpen: false })
        this.props.fetchPost(this.props.match.params.id)
      }
    )
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
        <div className="post-detail">
          <PostItemDetail post={post}/>
          <div className="buttons">
            <Vote id={post.id} />
            <button onClick={() => this.setState({editModeIsOn: true})}>Edit Post</button>
            <button onClick={() => this.deletePost(post.id)}>Delete Post</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="post-detail">
          {title && author && body && category && <PostForm mode="Edit"
            title={title}
            author={author}
            body={body}
            category={category}
            postId={post.id}
            handleSubmit = {() => this.handleSubmit()}
            handleCancel = {() => this.setState({editModeIsOn: false})}
            className="post-form"/>}
        </div>
      )
    }

  }
  render() {
    const { post } = this.props
    return (
      <div className="container">
        <button type="button" onClick={() => this.setState({fireRedirect: true})}>Back</button>
        <div className="post-container">
          <div className="post-sub-container">
            {this.renderPost(post)}
            <div className="comment">
              <button onClick={() => this.setState({commentFormIsOpen: true})}>Add Comment</button>
              {this.state.commentFormIsOpen &&
                <CommentForm postId={this.props.match.params.id}
                  handleCommentSubmit={() => this.handleCommentSubmit()}
                  closeCommentForm={() => this.setState({commentFormIsOpen: false})} />}
              <ul>
                {this.renderComments()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.postDeleted && <Redirect to="/notFound" />}
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
