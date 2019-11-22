import React from "react";
import { Card, Form, Input, Button, Row } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Template from "../../layout";
import api from "../../services/api";

export default Form.create({ name: "register" })(
  withRouter(({ form, ...props }) => {
    const { getFieldDecorator } = form;

    function submit(e) {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          console.log(values);

          api
            .storeUser(values)
            .then(response => {
              console.log(response);
              props.history.push("/");
            })
            .catch(error => console.log(error));
        }
      });
    }

    return (
      <Template title="Nova conta">
        <Card title="Cadastro de nova conta">
          <Form onSubmit={submit}>
            <Form.Item label="Nome Completo">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Informe o seu nome"
                  }
                ]
              })(<Input type="text"></Input>)}
            </Form.Item>

            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Informe o seu e-mail"
                  }
                ]
              })(<Input type="email"></Input>)}
            </Form.Item>
            <Form.Item label="Senha">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Informe uma senha"
                  }
                ]
              })(<Input type="password"></Input>)}
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
