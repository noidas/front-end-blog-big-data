import React from "react";
import { Card, Icon } from "antd";

import "./index.scss";

export default props => {
  return (
    <Card className="blog-profile">
      <div className="blog-profile-picture-container">
        <img
          className="blog-profile-picture"
          src={`https://picsum.photos/id/${Math.floor(
            Math.random() * 50
          )}/200/200`}
        ></img>
      </div>
      <span className="blog-profile-name">{props.name}</span>
      <p className="blog-profile-description">{props.description}</p>
      <div className="blog-profile-links">
        <p>Social links: </p>
        <Icon type="facebook" />
        <Icon type="instagram" />
        <Icon type="twitter" />
        <Icon type="linkedin" />
      </div>
    </Card>
  );
};
