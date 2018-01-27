import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { vote } from '../actions';

class Vote extends Component {
  vote(value) {
    const { id, match } = this.props;
    let vote = {
      option: value
    }
    this.props.vote(id, vote, match);
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
export default connect(null, { vote })(Vote);
