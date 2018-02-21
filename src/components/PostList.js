import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchPosts } from '../actions';
import PostItem from './PostItem';
import Sort from './Sort';
import * as API from '../utils/api';

class PostList extends Component {
  state = {
    refreshPage: false,
    selectedPost: {}
  }
  componentDidMount() {
    if (this.props.match) {
      this.props.fetchPosts(this.props.match.params.category)
    } else {
      this.props.fetchPosts();
    }
  }
  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return posts.map(post => {
        return (
          <PostItem post={post}
            key={post.id} match={this.props.match}
            editPost={(postId) => this.editPost(postId)}
            deletePost={(postId) => this.deletePost(postId)} />
        );
      })
    }
  }
  editPost(post) {
    this.setState({refreshPage: true, selectedPost: post});
  }
  deletePost(postId) {
    API.deletePost(postId).then(() => this.props.fetchPosts())
  }
  renderPage() {
    if (this.props.posts.length !== 0) {
      return (
        <div>
          <Sort />
          <table className="post-list">
            <tbody>
              <tr className="header-row">
                <th></th>
                <th>Category</th>
                <th>Title</th>
                <th>Author</th>
                <th>Comment</th>
                <th>Likes</th>
                <th>Date</th>
                <th>Manage</th>
              </tr>
              {this.renderPosts()}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <h2 className="no-posts">There are no posts in this category.</h2>
    }
  }
  render() {
    return (
      <div className="container">
        {this.props.match && <button><Link to="/">Back</Link></button>}
        {this.renderPage()}
        {this.state.refreshPage && <Redirect push to={{
          pathname: "/posts/" + this.state.selectedPost.id,
          state: {selectedPost: this.state.selectedPost}
        }} />}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}
export default connect(mapStateToProps, { fetchPosts })(PostList);
