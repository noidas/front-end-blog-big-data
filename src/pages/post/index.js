import React, { useEffect, useState } from "react";
import { Row, Col, Button, Tooltip, Spin } from "antd";

import Template from "../../layout";
import { Link, withRouter } from "react-router-dom";
import Profile from "../../components/profile";
import PostView from "../../components/postView";
import api from "../../services/api";

export default withRouter((props) => {
  const [blog, setblog] = useState({});
  const [post, setPost] = useState({
    session: []
  });
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({});
  const { id, blogid } = props.match.params;

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("autenticacao")) || {});
    setLoading(true);
    api
      .getBlogById(blogid)
      .then((response) => {
        setblog(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    api
      .getPostById(id)
      .then((response) => setPost(response))
      .catch((error) => console.log(error));
  }, [blogid, id]);

  function deletePost() {
    api
      .deletePost(id)
      .then((response) => {
        console.log(response);
        props.history.push(`/blog/${blogid}`);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Template title={blog.title} id={blog._id}>
      <Spin spinning={loading}>
        <div className="blog-list-post">
          <Row type="flex" gutter={24}>
            <Col md={7} sm={24}>
              <Profile
                name={blog.name}
                description={blog.description}
              ></Profile>
            </Col>
            <Col md={17} sm={24}>
              {auth._id === blog.iduser ? (
                <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
                  <Tooltip title="Deletar Postagem">
                    <Button
                      shape="circle"
                      icon="delete"
                      onClick={deletePost}
                    ></Button>
                  </Tooltip>
                </Row>
              ) : null}

              <PostView data={post}></PostView>
            </Col>
          </Row>
          <Row type="flex" justify="end" style={{ marginTop: 20 }}>
            <Link to={`/blog/${blogid}`}>
              <Button>Voltar</Button>{" "}
            </Link>
          </Row>
        </div>
      </Spin>
    </Template>
  );
});
