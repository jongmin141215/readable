import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import PostItem from './PostItem';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return posts.map(post => {
        return <PostItem post={post} key={post.id} />;
      })
    }
  }
  render() {
    console.log("PostList posts", this.props.posts)
    return (
      <ul className="post-list">
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
