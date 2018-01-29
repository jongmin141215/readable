import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  render() {
    return (
      <div>
        <Sort />
        <ul className="post-list">
          {this.renderPosts()}
        </ul>
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
