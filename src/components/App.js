import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CategoryList from './CategoryList';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/posts/new">Create Post</Link>
        <h1>Categories</h1>
          <CategoryList />
          <PostList />
      </div>
    );
  }
}
export default App;
