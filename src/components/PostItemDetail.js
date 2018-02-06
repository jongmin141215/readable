import React, { Component } from 'react';
import { formatDate } from '../utils/helpers';

class PostItemDetail extends Component {
  render() {
    console.log("TIMESTAMP TIMESTAMP", this.props.post)
    const { post } = this.props;
    return (
      <div>
        <div>
          <div className="inline-block post-margin">{post.category}</div>
          <div className="inline-block post-margin">{post.title}</div>
          <div className="inline-block post-margin">{post.voteScore}</div>
        </div>
        <div className="post-margin">{post.author}</div>
        <div>{post.timestamp && formatDate(post.timestamp)}</div>
        <div className="post-margin">{post.body}</div>
      </div>
    );
  }
}
export default PostItemDetail;
