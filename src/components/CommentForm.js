import React, { Component } from 'react';

class CommentForm extends Component {
  render() {
    return (
      <tr>
        <td>Body: <input type="text" /></td>
        <td>Author: <input type="text" /></td>
        <td><button>Save Comment</button></td>
      </tr>
    );
  }
}

export default CommentForm;
