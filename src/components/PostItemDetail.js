import React, { Component } from 'react';
import { formatDate, capitalize } from '../utils/helpers';

class PostItemDetail extends Component {
  render() {
    const { post } = this.props;
    return (
      <table className="post">
        <tbody>
          <tr><td className="post-category">{post.category && capitalize(post.category)}</td><td className="post-large">{post.title}</td><td>{post.voteScore}<span className="small">votes</span></td></tr>
          <tr><td></td><td className="small">{post.author} at {post.timestamp && formatDate(post.timestamp)}</td><td></td></tr>
          <tr><td></td><td className="post-large body">{post.body}</td><td></td></tr>
        </tbody>
      </table>

    );
  }
}
export default PostItemDetail;
