import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <button className="vote-button" onClick={() => this.vote("upVote")}>👍🏼</button>
        <button className="vote-button" onClick={() => this.vote("downVote")}>👎🏼</button>
      </div>
    );
  }
}
export default connect(null, { vote })(Vote);
