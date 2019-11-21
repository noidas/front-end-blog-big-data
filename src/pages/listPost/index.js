import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

import Profile from "../../components/profile";
import Post from "../../components/postCard";
import api from "../../services/api";
import Template from "../../layout/index";

export default props => {
  const id = props.match.params.id;
  const [auth, setAuth] = useState({});
  const [blog, setBlog] = useState({ posts: [] });

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("autenticacao")) || {});

    api
      .getBlogById(id)
      .then(response => {
        setBlog(response);
        console.log(response);
      })
      .catch(error => console.log(error));
  }, [id]);

  return (
    <Template title={blog.title}>
      <div className="blog-list-post">
        <Row type="flex" gutter={24}>
          <Col md={7} sm={24}>
            <Profile name={blog.name} description={blog.description}></Profile>
          </Col>
          <Col md={17} sm={24}>
            <Row type="flex" justify="space-between">
              <h1 style={{ fontSize: 20, marginBottom: 20 }}>
                Lista de Postagens
              </h1>
              {auth._id === id ? (
                <Link to={`/blog/${blog._id}/post/cadastrar`}>
                  <Button type="primary">Cadastrar Nova Postagem</Button>
                </Link>
              ) : null}
            </Row>
            {blog.posts.map(post => (
              <Post blogId={blog._id} data={post}></Post>
            ))}
          </Col>
        </Row>
      </div>
    </Template>
  );
};
