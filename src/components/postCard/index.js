import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import "./index.scss";

moment.locale("pt");

export default ({ data, ...props }) => {
  return (
    <Link to={`/blog/${props.blogId}/post/${data._id}`}>
      <Card className="blog-post">
        <Row type="flex" gutter={24}>
          <Col md={8}>
            <img
              className="blog-post-picture"
              src={`https://picsum.photos/id/${Math.floor(
                Math.random() * 50
              )}/120/120`}
            ></img>
          </Col>
          <Col md={14}>
            <Link className="blog-post-link">
              <h2 className="blog-post-title">{data.title}</h2>
            </Link>
            <div className="blog-post-details">
              <div className="blog-post-info">
                {moment(data.createdAt).format("LLL")}
              </div>
            </div>
            <div className="blog-post-summary">
              <p>{data.content}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};
