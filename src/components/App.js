import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = "http://localhost:3001";
const headers = {"Authorization": "secret"};

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    fetch(`${apiUrl}/categories`, { headers })
      .then(res => res.json())
      .then(({ categories }) => this.setState({ categories }))
  }
  renderCategories() {
    if (this.state.categories !== []) {
      return this.state.categories.map((category, index) => (
        <li key={index}><Link to={category.name}>{category.name}</Link></li>))
    }
  }
  render() {
    console.log(this.state.categories)
    return (
      <div>
        <h1>Categories</h1>
          <ul>
            {this.renderCategories()}
          </ul>
      </div>
    );
  }
}

export default App;
