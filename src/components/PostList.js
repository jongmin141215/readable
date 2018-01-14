import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostList extends Component {
  componentDidMound() {
    // fetchPosts.
  }
  render() {
    return (
      <div>
      Post List
      </div>
    );
  }
}
// const mapDispatchToProps = dispatch => ({
//   fetchPostsByCategory:
// })

export default PostList;
