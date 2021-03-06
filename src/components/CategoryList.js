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
          <li key={category.name} className="list-item">
            <Link className="list-item-link" to={category.name}>{category.name.toUpperCase()}</Link>
          </li>
        )
      })
    }
  }
  render() {
    return (
      <ul className="category-list">
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
