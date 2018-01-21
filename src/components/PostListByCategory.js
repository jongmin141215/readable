import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostsByCategory } from '../actions';

class PostListByCategory extends Component {
  componentDidMount() {
    this.props.fetchPostsByCategory(this.props.match.params.category)
    console.log("in post list", this.props.posts)
  }
  renderPosts() {
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
    return (
      <div>
      Post List
      {this.renderPosts()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.posts
})
export default connect(mapStateToProps, { fetchPostsByCategory })(PostListByCategory);
