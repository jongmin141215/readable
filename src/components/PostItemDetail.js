import React, { Component } from 'react';

class PostItemDetail extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <div>
          <div className="inline-block post-margin">{post.category}</div>
          <div className="inline-block post-margin">{post.title}</div>
          <div className="inline-block post-margin">{post.voteScore}</div>
        </div>
        <div className="post-margin">{post.author} - {post.timestamp}</div>
        <div className="post-margin">{post.body}</div>
      </div>
    );
  }
}
export default PostItemDetail;
