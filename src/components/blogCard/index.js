import React from "react";
import { Row, Col, Card } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
import moment from "moment";

moment.locale("pt-br");
export default ({ data, ...props }) => {
  return (
    <Link to={`/blog/${data._id}`}>
      <Card className="blog-card">
        <Row type="flex">
          <Col md={8}>
            <img
              className="blog-post-picture"
              src={`https://picsum.photos/id/${Math.floor(
                Math.random() * 50
              )}/120/120`}
            ></img>
          </Col>
          <Col md={14}>
            <div className="blog-card-infos">
              <h2 className="blog-card-title">{data.title}</h2>
              <div className="blog-card-details">
                <div>{moment(data.createdAt).format("LLL")}</div>
              </div>
              <p className="blog-card-autor">Autor: {data.name}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};
