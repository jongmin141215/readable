import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return posts.map(post => {
        return (
          <li key={post.id}>
            <Link to={"/posts/" + post.id}>
            <span>{post.category}</span><span>{post.title}</span><span>{post.commentCount}</span><span>{post.voteScore}</span><span>{post.timestamp}</span>
            </Link>
          </li>
        )
      })
    }
  }
  render() {
    console.log("PostList posts", this.props.posts)
    return (
      <ul>
        {this.renderPosts()}
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}
export default connect(mapStateToProps, { fetchPosts })(PostList);
