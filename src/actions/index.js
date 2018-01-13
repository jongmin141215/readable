export const STORE_POSTS = "STORE_POSTS";
export const SELECT_POST = "SELECT_POST";
export const STORE_POST = "STORE_POST";

export const storePosts = (posts) => {
  return {
    type: STORE_POSTS,
    posts
  }
}

export const selectPost = (selectedPost) => {
  return {
    type: SELECT_POST,
    selectedPost
  }
}

export const storePost = (post) => {
  return {
    type: STORE_POST,
    post
  }
}
