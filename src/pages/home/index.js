import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

import Layout from "../../layout/index";
import BlogCard from "../../components/blogCard";
import api from "../../services/api";
import "./index.scss";

export default () => {
  const [auth, setAuth] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("autenticacao")) || {});

    api
      .getBlogs()
      .then(response => {
        setBlogs(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Layout title="Blogs">
      <div className="home">
        <Row type="flex" justify={"space-between"}>
          <h1 className="home-title">Apresentando todos os blogs</h1>

          {auth._id != null ? (
            <Link to={"/blog/cadastrar"}>
              <Button type="primary">Criar novo blog</Button>
            </Link>
          ) : (
            <Link to="/user/cadastrar">
              <Button type="primary">Criar conta</Button>
            </Link>
          )}
        </Row>
        <Row type="flex" gutter={24}>
          {blogs.map(blog => (
            <Col className="margin-bottom" md={12} key={blog.id}>
              <BlogCard data={blog}></BlogCard>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};
