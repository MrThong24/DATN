import React, { useEffect } from "react";
import { Layout, Button, Form, Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/styles/main.css";
import "../../assets/styles/responsive.css";
import "../../styles/signIn.css";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, userInfo } = userLogin;

  /* START event notify */
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
  /* END event notify */

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.isAdmin) {
        window.location.href = "/dashboard";
      } else if (
        userInfo?.status === "Đang hoạt động" &&
        userInfo.position_employee === "Công nhân xây dựng"
      ) {
        window.location.href = "/profile";
      } else if (
        userInfo?.status === "Đang hoạt động" &&
        userInfo.position_employee === "Trưởng nhóm xây dựng"
      ) {
        window.location.href = "/manager/profile";
      } else {
        notifyError();
      }
    }
    if (error) {
      notifyError();
    }
  }, [userInfo, error]);

  /* START truyền dữ liệu */
  const onFinish = (values) => {
    dispatch(login(values.account_employee, values.password_employee));
  };
  /* END truyền dữ liệu */

  return (
    <>
      <div className="signIn">
        <div class="Sign_in">
          <div class="SignIn_left">
            <img
              src="https://images.unsplash.com/photo-1512403754473-27835f7b9984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJ1aWxkaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div class="SignIn_right">
            <Form
              onFinish={onFinish}
              layout="vertical"
              className="row-col"
              autoComplete="off"
              style={{ marginTop: "100px" }}
            >
              <Form.Item
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
                <Input placeholder="Tài khoản" autoComplete="off" />
              </Form.Item>
              <div className="password_container">
                <Form.Item
                  class="password_container"
                  label="Mật khẩu"
                  name="password_employee"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                      type: "string",
                    },
                  ]}
                >
                  <Input.Password
                    autoComplete="new-password"
                    class="password_container"
                    placeholder="Mật khẩu"
                    iconRender={(visible) =>
                      visible ? (
                        <EyeTwoTone className="iconEye" />
                      ) : (
                        <EyeInvisibleOutlined className="iconEye" />
                      )
                    }
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="signInBtn"
                  style={{
                    width: "60%",
                    marginTop: "20px",
                  }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignIn;
