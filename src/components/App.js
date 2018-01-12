import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, selectPost } from '../actions';

const apiUrl = "http://localhost:3001";
const headers = {"Authorization": "secret"};

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    fetch(`${apiUrl}/categories`, { headers })
      .then(res => res.json())
      .then(({ categories }) => this.setState({ categories }))
    fetch(`${apiUrl}/posts`, { headers })
      .then(res => res.json())
      .then(posts => (
        this.props.fetchPosts(posts)

      ))
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
            <tr><th>{post.category}</th><td><Link onClick={() => this.selectPost(post)} to="/posts/:id">{post.title}</Link></td><td>{post.author}</td><td>{post.commentCount}</td><td>{post.voteScore}</td></tr>
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
  fetchPosts: (posts) => dispatch(fetchPosts(posts)),
  selectPost: (post) => dispatch(selectPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
