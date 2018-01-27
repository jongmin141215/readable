import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import PostItem from './PostItem';

class PostList extends Component {
  componentDidMount() {
    if (this.props.match) {
      console.log(this.props.match)
      this.props.fetchPosts(this.props.match.params.category)
    } else {
      this.props.fetchPosts();
    }
  }
  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return posts.map(post => {
        return <PostItem post={post} key={post.id} match={this.props.match} />;
      })
    }
  }
  render() {
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
