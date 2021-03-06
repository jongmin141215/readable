import React from 'react';
import { Link } from 'react-router-dom';
import Vote from './Vote';
import { formatDate, capitalize } from '../utils/helpers';

const PostItem = (props) => {
  const { post } = props;
  return (
    <tr className="post-item" key={post.id}>
      <td><Vote id={post.id} match={props.match}/></td>
      <td className="medium-cell">{capitalize(post.category)}</td>
      <td className="large-cell">
        <Link to={post.category + "/" + post.id} className="post-item-link">
          <span>{post.title}</span>
        </Link></td>
      <td>{post.author}</td>
      <td className="sm-cell">{post.commentCount}</td>
      <td className="sm-cell">{post.voteScore}</td>
      <td className="lg-md-cell">{formatDate(post.timestamp)}</td>
      <td style={{width: "132px", textAlign: "center"}}>
        <button onClick={() => props.editPost(post)}>Edit</button>
        <button onClick={() => props.deletePost(post.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default PostItem;
