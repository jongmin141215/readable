export const FETCH_POSTS = "FETCH_POSTS";
export const SELECT_POST = "SELECT_POST";

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POSTS,
    posts
  }
}

export const selectPost = (selectedPost) => {
  return {
    type: SELECT_POST,
    selectedPost
  }
}
