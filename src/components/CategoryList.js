import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions';

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  renderCategories() {
    const { categories } = this.props;
    if (categories) {
      return categories.map(category => {
        return (
          <li key={category.name}>
            <Link to={category.name + "/posts"}>{category.name}</Link>
          </li>
        )
      })
    }
  }
  render() {
    return (
      <ul>
        {this.renderCategories()}
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
export default connect(mapStateToProps, { fetchCategories })(CategoryList);
