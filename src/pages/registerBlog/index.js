import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Row } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Template from "../../layout";
import api from "../../services/api";

export default Form.create({ name: "register" })(
  withRouter(({ form, ...props }) => {
    const { getFieldDecorator } = form;
    const [auth, setAuth] = useState({});

    useEffect(() => {
      setAuth(JSON.parse(localStorage.getItem("autenticacao")) || {});
    }, []);

    function submit(e) {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const blog = {
            title: values.title,
            description: values.description,
            iduser: auth._id,
            name: auth.name
          };

          api
            .storeBlog(auth._id, blog)
            .then(response => {
              console.log(response);
              props.history.push("/");
            })
            .catch(error => console.log(error));
        }
      });
    }

    return (
      <Template title="Meus Blogs">
        <Card title="Cadastro de Blog">
          <Form onSubmit={submit}>
            <Form.Item label="Titulo do Blog">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Informe o titulo do blog"
                  }
                ]
              })(<Input type="text"></Input>)}
            </Form.Item>
            <Form.Item label="Descrição do blog">
              {getFieldDecorator("description", {
                rules: [
                  {
                    message: "Informe uma descrição"
                  }
                ]
              })(<Input type="text"></Input>)}
            </Form.Item>
            <Row type="flex" justify="end">
              <Link to="/">
                <Button style={{ marginRight: 20 }}>Cancelar</Button>
              </Link>
              <Button type="primary" onClick={submit}>
                Salvar
              </Button>
            </Row>
          </Form>
        </Card>
      </Template>
    );
  })
);
