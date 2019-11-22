import React from "react";
import Template from "../../layout/index";
import { Card, Form, Input, Icon, Button, Checkbox, notification } from "antd";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import "./index.scss";
import ErrorWithStack from "jest-util/build/ErrorWithStack";
export default Form.create({ name: "login" })(
  withRouter(({ form, ...props }) => {
    const { getFieldDecorator } = form;
    function sumit(event) {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          api
            .autenticar(values)
            .then(response => {
              console.log(response);
              localStorage.setItem("autenticacao", JSON.stringify(response));
              props.history.push(`/`);
            })
            .catch(error =>
              notification.warning({ message: "e-mail ou senha invalidos!" })
            );
        }
      });
    }
    return (
      <Template title="Meus Blogs">
        <div className="login">
          <Card title="Área Restrita">
            <Form onSubmit={sumit} className="login-form">
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Informe o usuário!" }]
                })(
                  <Input
                    type="email"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Usuário"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Informe a senha!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Senha"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Acessar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Template>
    );
  })
);
