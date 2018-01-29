import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as API from '../utils/api';
const uuidv4 = require('uuid/v4');

class PostForm extends Component {
  state = {
    title: this.props.title || "",
    author: this.props.author || "",
    body: this.props.body || "",
    category: this.props.category || "",
    fireRedirect: false
  }
  updateTitle(title) { this.setState({ title })}
  updateAuthor(author) { this.setState({ author })}
  updateBody(body) { this.setState({ body })}
  updateCategory(category) { this.setState({ category })}

  handleSubmit(event) {
    const { title, body, author, category } = this.state;
    const { mode, postId, handleSubmit } = this.props;
    event.preventDefault();
    if (mode === "Edit") {
      let post = {
        title,
        body
      }
      API.updatePost(postId, post)
      handleSubmit()
    } else {
      let post = {
        timestamp: Date.now(),
        title,
        body,
        author,
        category,
        id: uuidv4()
      }
      API.addPost(post)
      this.setState({ fireRedirect: true })
    }
  }
  render() {
    const { category, title, author, body, fireRedirect } = this.state;
    const editMode = this.props.mode === "Edit" ? true : false;

    return(
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>Category</label>
        <select onChange={event => this.updateCategory(event.target.value)} value={category}
          defaultValue={category}
          disabled={editMode}>
          <option>Choose</option>
          <option value="react" >React</option>
          <option value="redux" >Redux</option>
          <option value="udacity" >Udacity</option>
        </select>
        <label>Title</label>
        <input type="text" value={title} onChange={event => this.updateTitle(event.target.value)} />
        <label>Author</label>
        <input type="text" value={author}
          onChange={event => this.updateAuthor(event.target.value)}
          disabled={editMode} />
        <label>Body</label>
        <textarea value={body} onChange={event => this.updateBody(event.target.value)}></textarea>
        <button type="submit">{editMode ? "Update Post" : "Save Post"}</button>
        { fireRedirect && <Redirect to="/" />}
      </form>
    );
  }
}

export default PostForm;
