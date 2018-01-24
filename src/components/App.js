import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PostItemPage from './PostItemPage';
import CategoryList from './CategoryList';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/posts/new">Create Post</Link>
        <h1>Categories</h1>
          <CategoryList />
          <PostList />
      </div>
    );
  }
}
export default App;
