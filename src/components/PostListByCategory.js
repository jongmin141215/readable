import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostsByCategory } from '../actions';
import PostItem from './PostItem';

class PostListByCategory extends Component {
  componentDidMount() {
    this.props.fetchPostsByCategory(this.props.match.params.category)
    console.log("in post list", this.props.posts)
  }
  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return posts.map((post) => {
        return <PostItem post={post} />;
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
const mapStateToProps = state => ({
  posts: state.posts
})
export default connect(mapStateToProps, { fetchPostsByCategory })(PostListByCategory);
