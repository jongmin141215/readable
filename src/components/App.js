import React, { Component } from 'react';

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
        <li key={index}>{category.name}</li>))
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
