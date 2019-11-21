import React from "react";
import Template from "../../layout";
import { Card, Form, Input, Button, Row } from "antd";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

export default Form.create({ name: "register" })(
  withRouter(({ form, ...props }) => {
    const { getFieldDecorator } = form;
    const { blogid } = props.match.params;
    function submit(e) {
      e.preventDefault();
      form.validateFields((err, values) => {
        console.log("entrou");
        if (!err) {
          console.log("entrou1");
          api
            .storePost(blogid, {
              title: values.title,
              content: values.content,
              session: [
                {
                  index: "1.0",
                  title: values.sessionTitle,
                  content: values.sessionContent
                }
              ]
            })
            .then((response) => {
              console.log(response);
              props.history.push(`/blog/${blogid}`);
            })
            .catch((error) => console.log(error));
        }
      });
    }

    return (
      <Template title="Meus Blogs">
        <Card title="Nova Postagem">
          <Form onSubmit={submit}>
            <Form.Item label="Titulo da Postagem">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Informe o titulo da postagem"
                  }
                ]
              })(<Input type="text"></Input>)}
            </Form.Item>
            <Form.Item label="Conteúdo da Postagem">
              {getFieldDecorator("content", {
                rules: [
                  {
                    required: true,
                    message: "Informe o conteúdo da postagem"
                  }
                ]
              })(<Input.TextArea rows={5}></Input.TextArea>)}
            </Form.Item>
            <Form>
              <h3>Cadastro de Secao</h3>
              <Form.Item label="Titulo da secao">
                {getFieldDecorator("sessionTitle", {
                  rules: [{}]
                })(<Input></Input>)}
              </Form.Item>
              <Form.Item label="Conteúdo da secao">
                {getFieldDecorator("sessionContent", {
                  rules: [{}]
                })(<Input.TextArea rows={5}></Input.TextArea>)}
              </Form.Item>
            </Form>

            <Row type="flex" justify="end">
              <Link to={`/blog/${blogid}`}>
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
