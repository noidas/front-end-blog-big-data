import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../layout/index";
import BlogCard from "../../components/blogCard";
import api from "../../services/api";
import "./index.scss";
export default () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    api
      .getBlogs()
      .then(response => {
        setBlogs(response);
        console.log(response);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <Layout title="Blogs">
      <div className="home">
        <Row type="flex" justify={"space-between"}>
          <h1 className="home-title">Apresentando todos os blogs</h1>
          <Link to="/blog/cadastrar">
            <Button type="primary">Cadastrar Novo Blog</Button>
          </Link>
        </Row>
        <Row type="flex" gutter={24}>
          {blogs.map(blog => (
            <Col className="margin-bottom" md={12} key={blog._id}>
              <BlogCard data={blog}></BlogCard>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};
