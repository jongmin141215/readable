import React from 'react';
import { Link } from 'react-router-dom';
import Vote from './Vote';
import { formatDate } from '../utils/helpers';

const PostItem = (props) => {
  const { post } = props;
  let options = {
    hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'
  }
  return (
    <li key={post.id} className="post-item">
      <span><Vote id={post.id} match={props.match}/></span>
      <Link to={"/posts/" + post.id} className="post-item-link">
      <span>{post.category}</span><span>{post.title}</span><span>{post.commentCount}</span><span>{post.voteScore}</span>
      <span>{formatDate(post.timestamp)}</span>
      </Link>
    </li>
  );
}

export default PostItem;
