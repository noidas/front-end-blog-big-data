import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Card, Form, Input, Button, Row, Icon } from "antd";

import Template from "../../layout";
import api from "../../services/api";

export default Form.create({ name: "register" })(
  withRouter(({ form, ...props }) => {
    const [id, setId] = useState(0);
    const { getFieldDecorator, getFieldValue } = form;
    const { blogid } = props.match.params;

    function submit(e) {
      e.preventDefault();

      form.validateFields((err, values) => {
        let sessions = [];
        if (!err) {
          console.log(values);
          for (let key in values.keys) {
            sessions.push({
              index: `${parseInt(key) + 1}.0`,
              title: values.sessionTitle[key] || "",
              content: values.sessionContent[key] || ""
            });
          }

          api
            .storePost(blogid, {
              title: values.title,
              content: values.content,
              session: sessions
            })
            .then(response => {
              console.log(response);
              props.history.push(`/blog/${blogid}`);
            })
            .catch(error => console.log(error));
        }
      });
    }

    function remove(k) {
      const keys = form.getFieldValue("keys");
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      });
    }

    function add() {
      const keys = form.getFieldValue("keys");
      setId(id + 1);
      const nextKeys = keys.concat(id);
      form.setFieldsValue({
        keys: nextKeys
      });
    }

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItems = keys.map((k, index) => (
      <>
        <Row type="flex" justify="space-between">
          <h3>Seção {k + 1}</h3>
        </Row>

        <Form.Item label="Titulo da Seção" key={k}>
          {getFieldDecorator(`sessionTitle[${k}]`, {
            rules: [{}]
          })(<Input></Input>)}
        </Form.Item>
        <Form.Item label="Conteúdo da Seção" key={"t" + k}>
          {getFieldDecorator(`sessionContent[${k}]`, {
            rules: [{}]
          })(<Input.TextArea rows={5}></Input.TextArea>)}
        </Form.Item>
      </>
    ));

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

            {formItems}
            <Row type="flex" justify="end" style={{ marginBottom: 20 }}>
              <Button onClick={add}>
                <Icon type="plus" /> Adicionar Sessao
              </Button>
            </Row>

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
