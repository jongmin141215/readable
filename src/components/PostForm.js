import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as API from '../utils/api';
const uuidv4 = require('uuid/v4');

class PostForm extends Component {
  state = {
    title: "",
    author: "",
    body: "",
    category: "",
    fireRedirect: false
  }
  updateTitle(title) {
    this.setState({ title })
  }
  updateAuthor(author) {
    this.setState({ author })
  }
  updateBody(body) {
    this.setState({ body })
  }
  updateCategory(category) {
    this.setState({ category })
  }
  handleSubmit(event) {
    event.preventDefault();
    let post = {
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      id: uuidv4()
    }
    API.addPost(post)
    this.setState({ fireRedirect: true })
  }
  render() {
    return(
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>Category</label>
        <select onChange={event => this.updateCategory(event.target.value)} value={this.state.value}>
          <option>Choose</option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={event => this.updateTitle(event.target.value)} />
        <label>Author</label>
        <input type="text" value={this.state.author} onChange={event => this.updateAuthor(event.target.value)}/>
        <label>Body</label>
        <textarea value={this.state.body} onChange={event => this.updateBody(event.target.value)}></textarea>
        <button type="submit">Submit</button>
        { this.state.fireRedirect && <Redirect to="/" />}
      </form>
    );
  }
}

export default PostForm;
