import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as API from '../utils/api';
import { storePost } from '../actions';

class PostItem extends Component {
  componentDidMount() {
    API.getPost(this.props.match.params.id)
      .then(post => {
        console.log("POST", post)
        this.props.storePost(post)})
  }
  render() {
    console.log("post item prop", this.props.post)
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
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.post
  }
}
const mapDispatchToProps = dispatch => ({
  storePost: (post) => dispatch(storePost(post))
})
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
