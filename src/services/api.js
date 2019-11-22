import axios from "axios";

const apii = axios.create({
  // baseURL: "https://api-blog-pos.herokuapp.com"
  baseURL: "http://localhost:3333"
});

async function storeUser(user) {
  return new Promise((resolve, reject) => {
    apii
      .post("user", user)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function getBlogs() {
  return new Promise((resolve, reject) => {
    apii
      .get("blog")
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function getBlogById(id) {
  return new Promise((resolve, reject) => {
    apii
      .get(`blog/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function getPostById(id) {
  return new Promise((resolve, reject) => {
    apii
      .get(`post/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function storeBlog(id, blog) {
  return new Promise((resolve, reject) => {
    apii
      .post(`user/${id}/blog`, blog)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function storePost(blogid, post) {
  return new Promise((resolve, reject) => {
    console.log("entrou", blogid, post);

    apii
      .post(`blog/${blogid}/post`, post)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function deletePost(id) {
  return new Promise((resolve, reject) => {
    apii
      .delete(`post/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

async function autenticar(auth) {
  return new Promise((resolve, reject) => {
    apii
      .post("autenticacao", auth)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => reject(error));
  });
}

const api = {
  getBlogs,
  getBlogById,
  getPostById,
  storeBlog,
  storeUser,
  autenticar,
  storePost,
  deletePost
};

export default api;
