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
      <td className="large-cell"><Link to={"/posts/" + post.id} className="post-item-link">

      <span>{post.title}</span>
        </Link></td>
      <td className="sm-cell">{post.commentCount}</td>
      <td className="sm-cell">{post.voteScore}</td>
      <td className="lg-md-cell">{formatDate(post.timestamp)}</td>
    </tr>
  );
}

export default PostItem;
