import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, BrowserRouter } from 'react-router-dom';

import * as API from '../utils/api';
import { fetchPosts, selectPost } from '../actions';
import PostItem from './PostItem';
import CategoryList from './CategoryList';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  selectPost(post) {
    this.props.selectPost(post)
  }
  renderAllPosts() {
    if (this.props.posts) {
      return this.props.posts.map((post, index) => (
        <li key={index}>
          <table>
            <tbody>
            <tr><th>{post.category}</th><td><Link onClick={() => this.selectPost(post)} to={"/posts/" + post.id}>{post.title}</Link></td><td>{post.author}</td><td>{post.commentCount}</td><td>{post.voteScore}</td></tr>
            </tbody>
          </table>
        </li>
      ))
    }
  }
  render() {
    console.log("PROPS", this.props.posts[0])
    return (
      <div>
        <Link to="/posts/new">Create Post</Link>
        <h1>Categories</h1>
          <CategoryList />
          <ul>
            {this.renderAllPosts()}
          </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    posts: state.posts,
    selectedPost: state.selectedPost
  }
}

// const mapDispatchToProps = dispatch => ({
//   fetchPosts: (posts) => dispatch(fetchPosts(posts)),
//   selectPost: (post) => dispatch(selectPost(post))
// })

export default connect(mapStateToProps, { fetchPosts })(App);
