import React, { Component } from 'react';
import { formatDate, capitalize } from '../utils/helpers';

class PostItemDetail extends Component {
  render() {
    console.log("TIMESTAMP TIMESTAMP", this.props.post)
    const { post } = this.props;
    return (
      <table className="post">
        <tbody>
          <tr><td>{post.category && capitalize(post.category)}</td><td className="large-cell">{post.title}</td><td>{post.voteScore}<span className="small">votes</span></td></tr>
          <tr><td></td><td className="small">{post.author} at {post.timestamp && formatDate(post.timestamp)}</td><td></td></tr>
          <tr><td></td><td className="large-cell body">{post.body}</td><td></td></tr>
        </tbody>
      </table>

    );
  }
}
export default PostItemDetail;
