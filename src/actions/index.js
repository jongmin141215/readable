export const FETCH_POSTS = "FETCH_POSTS";

export function fetchPosts(posts) {
  return {
    type: FETCH_POSTS,
    posts
  }
}
