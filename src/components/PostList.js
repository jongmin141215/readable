import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import PostItem from './PostItem';
import Sort from './Sort';

class PostList extends Component {
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
        return <PostItem post={post} key={post.id} match={this.props.match} />;
      })
    }
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
                <th>Comment</th>
                <th>Likes</th>
                <th>Date</th>
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
