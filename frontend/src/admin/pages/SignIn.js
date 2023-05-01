import React from "react";
import { Layout, Button, Form, Input, Checkbox } from "antd";

import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";
import "../../styles/signIn.css";
const SignIn = () => {
  return (
    <>
      <div className="signIn">
        <Layout className="layout-default layout-signin">
          <h2 className="title">Welcome Back!</h2>
          <p className="register">
            Don't have an account?{" "}
            {/* <Link to="/sign-up" className="register-link">
              Sign Up
            </Link> */}
          </p>
          <Form
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="username"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email" className="inputUser" />
            </Form.Item>
            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="inputPass"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className="iconEye" />
                  ) : (
                    <EyeInvisibleOutlined className="iconEye" />
                  )
                }
                autoComplete={false}
              />
            </Form.Item>
            <Form.Item
              name="remember"
              className="aligin-center"
              valuePropName="checked"
            >
              <Checkbox className="remember">Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signInBtn"
                style={{
                  width: "80%",
                }}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Layout>
      </div>
    </>
  );
};

export default SignIn;
