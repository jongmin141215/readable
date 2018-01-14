import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, BrowserRouter } from 'react-router-dom';

import * as API from '../utils/api';
import { storePosts, selectPost } from '../actions';
import PostItem from './PostItem';

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    API.getCategories().then(categories => this.setState({ categories }))
    API.getAllPosts().then(posts => this.props.storePosts(posts))
  }
  renderCategories() {
    if (this.state.categories !== []) {
      return this.state.categories.map((category, index) => (
        <li key={index}><Link to={category.name}>{category.name}</Link></li>))
    }
  }
  selectPost(post) {
    this.props.selectPost(post)
  }
  renderAllPosts() {
    if (this.props.posts[0]) {
      return this.props.posts[0].map((post, index) => (
        <li key={index}>
          <table>
            <tbody>
            <tr><th>{post.category}</th><td><Link onClick={() => this.selectPost(post)} to={"/posts/" + post.id}>{post.title}</Link></td><td>{post.author}</td><td>{post.commentCount}</td><td>{post.voteScore}</td><td>{JSON.stringify(post)}</td></tr>
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
          <ul>
            {this.renderCategories()}
          </ul>
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

const mapDispatchToProps = dispatch => ({
  storePosts: (posts) => dispatch(storePosts(posts)),
  selectPost: (post) => dispatch(selectPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
