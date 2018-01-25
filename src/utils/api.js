const apiUrl = "http://localhost:3001";
const headers = {"Authorization": "secret"};

export const getCategories = () => {
  return fetch(`${apiUrl}/categories`, { headers })
    .then(res => res.json())
    .then(({ categories }) => categories)
}
export const getAllPosts = () => (
  fetch(`${apiUrl}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts)
)
export const getPostsByCategory = (category) => (
  fetch(`${apiUrl}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts)
)
export const getPost = (id) => {
  return fetch(`${apiUrl}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(post => post)
}
export const addPost = (post) => {
  console.log("JSON.stringify(post)", JSON.stringify(post))
  fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => {
    console.log("res", res)
    res.json()})
}
export const getComments = (postId) => {
  return fetch(`${apiUrl}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments)
}
export const addComment = (comment) => {
  fetch(`${apiUrl}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res =>{
      console.log("comment body", JSON.stringify(comment))
      console.log("add comment response", res);
      res.json()
    })
}
export const updatePost = (postId, post) => {
  return fetch(`${apiUrl}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => {
      console.log("UPDATE POST", JSON.stringify(post))
      res.json()
    })
}
export const updateComment = (commentId, comment) => {
  return fetch(`${apiUrl}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
}
export const deleteComment = (commentId) => {
  return fetch(`${apiUrl}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  })
}
