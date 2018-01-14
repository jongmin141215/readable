const apiUrl = "http://localhost:3001";
const headers = {"Authorization": "secret"};

export const getCategories = () => {
  return fetch(`${apiUrl}/categories`, { headers })
    .then(res => res.json())
    .then(({ categories }) => categories)
}
export const getAllPosts = () => {
  return fetch(`${apiUrl}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts)
}
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
