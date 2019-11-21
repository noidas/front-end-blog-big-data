import React from "react";
import { Card } from "antd";
import moment from "moment";

import "./index.scss";
import post from "../../pages/post";

export default ({ data, ...props }) => {
  console.log(data);

  const montarSessoes = data => {
    const { session } = data;

    const resultado = session.sort(function(a, b) {
      return parseFloat(a.index) - parseFloat(b.index);
    });

    return resultado.map(session => (
      <div>
        <h2>
          {session.index} - {session.title}
        </h2>
        <p>{session.content}</p>
      </div>
    ));
  };

  return (
    <Card className="blog-postview">
      <div
        className="blog-postview-image"
        style={{
          backgroundImage: `url(https://picsum.photos/id/${Math.floor(
            Math.random() * 50
          )}/800/290)`
        }}
      ></div>
      <div className="blog-postview-content">
        <h1 className="blog-postview-title">{data.title}</h1>
        <div className="blog-postview-details">
          <div className="blog-postview-info">
            {moment(data.createdAt).format("LLL")}
          </div>
        </div>
        <div className="blog-postview-content">{data.content}</div>
        <div className="blog-postview-content">{montarSessoes(data)}</div>
      </div>
    </Card>
  );
};
