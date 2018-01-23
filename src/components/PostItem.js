import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = (props) => {
  const { post } = props;
  return (
    <li key={post.id} className="post-item">
      <Link to={"/posts/" + post.id} className="post-item-link">
      <span>{post.category}</span><span>{post.title}</span><span>{post.commentCount}</span><span>{post.voteScore}</span><span>{post.timestamp}</span>
      </Link>
    </li>
  );
}

export default PostItem;
