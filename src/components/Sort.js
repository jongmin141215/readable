import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sort } from '../actions';

class Sort extends Component {
  sort(by, order) {
    this.props.sort(by, order)
  }
  render() {
    return (
      <div className="sort">
        <span className="label">Sort By:</span>
        <button className="sort-button" onClick={() => this.sort("voteScore", "desc")}>Vote Score (High to Low)</button>
        <button className="sort-button" onClick={() => this.sort("voteScore", "asc")}>Vote Score (Low to High)</button>
        <button className="sort-button" onClick={() => this.sort("timestamp", "desc")}>Time (New to Old)</button>
        <button className="sort-button" onClick={() => this.sort("timestamp", "asc")}>Time (Old to New)</button>
      </div>
    );
  }
}

export default connect(null, { sort })(Sort);
