import React from 'react';
import { Link } from 'react-router-dom';
import Vote from './Vote';

const PostItem = (props) => {
  const { post } = props;
  return (
    <li key={post.id} className="post-item">
      <span><Vote postId={post.id} /></span>
      <Link to={"/posts/" + post.id} className="post-item-link">
      <span>{post.category}</span><span>{post.title}</span><span>{post.commentCount}</span><span>{post.voteScore}</span><span>{post.timestamp}</span>
      </Link>
    </li>
  );
}

export default PostItem;
