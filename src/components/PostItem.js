import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as API from '../utils/api';
import { fetchPost, fetchComments } from '../actions';

class PostItem extends Component {

  componentDidMount() {
    // console.log("id", this.props.)
    this.props.fetchPost(this.props.match.params.id)
    this.props.fetchComments(this.props.match.params.id)
    // API.getComments(this.props.match.params.id).then(comments => console.log("commnents", comments))
  }
  renderComments() {
    const { comments } = this.props;
    if (comments) {
      return comments.map(comment => {
        return <tr key={comment.id}><td>{comment.body}</td><td>{comment.author}</td></tr>
      })
    }

  }
  render() {
    console.log("post item prop", this.props)
    const { post } = this.props
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>{post.category}</td><td>{post.title}</td><td>{post.voteScore}</td>
            </tr>
            <tr><td></td><td>{post.author}</td><td>{post.timestamp}</td></tr>
            <tr><td></td><td>{post.body}</td></tr>
            {this.renderComments()}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.post,
    comments: state.comments
  }
}
export default connect(mapStateToProps, { fetchPost, fetchComments })(PostItem);
