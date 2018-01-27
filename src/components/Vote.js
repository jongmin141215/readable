import React, { Component } from 'react';
import * as API from '../utils/api';

class Vote extends Component {
  vote(value) {
    console.log(value)
    let vote = {
      option: value
    }
    API.votePost(this.props.postId, vote)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.vote("upVote")}>Upvote</button>
        <button onClick={() => this.vote("downVote")}>Downvote</button>
      </div>
    );
  }
}
export default Vote;
