import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CategoryList from './CategoryList';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div>
        <CategoryList />
        <div className="container">
          <Link to="/posts/new" className="add-post-button">Create Post</Link>
          <PostList />
        </div>
      </div>
    );
  }
}
export default App;
