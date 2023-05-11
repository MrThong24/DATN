import React, { useEffect } from "react";
import { Layout, Button, Form, Input, Checkbox } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";
import "../../styles/signIn.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ location }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;

  const navigate = useNavigate();
  /* START column notify */
  const notifyError = () => {
    toast.error(" Tên tài khoản hoặc mật khẩu sai!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  /* END column notify */

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.isAdmin) {
        navigate("/dashboard/employee");
      } else {
        navigate("/profile");
      }
    }
    if (error) {
      notifyError();
    }
  }, [userInfo, error]);

  const onFinish = (values) => {
    dispatch(login(values.account_employee, values.password_employee));
  };

  return (
    <>
      <div className="signIn">
        <Layout className="layout-default layout-signin">
          <h2 className="title">Chào mừng trở lại!</h2>
          <Form onFinish={onFinish} layout="vertical" className="row-col">
            <Form.Item
              className="username"
              label="Tên tài khoản"
              name="account_employee"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tài khoản!",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="Tài khoản" className="inputUser" />
            </Form.Item>
            <Form.Item
              className="username"
              label="Mật khẩu"
              name="password_employee"
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signInBtn"
                style={{
                  width: "80%",
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <ToastContainer />
        </Layout>
      </div>
    </>
  );
};

export default SignIn;
