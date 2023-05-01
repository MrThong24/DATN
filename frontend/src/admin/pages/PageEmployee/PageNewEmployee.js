import React, { useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";

import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import LayoutPage from "../../Layout/LayoutPage";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PageNewEmployee = () => {
  const [image, setImage] = useState();
  const [birthday, setBirthday] = useState("");
  const onSubmit = (e) => {
    console.log(e);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeDepartment = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  });
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };
  return (
    <LayoutPage title="Tạo mới nhân viên">
      <Form layout="vertical" className="row-col">
        <Row className="mt-5">
          <Col xs={12} xl={8}>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Tên tài khoản"
                  name="employee_account"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên tài khoản"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Mật khẩu"
                  name="employee_password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="inputPass"
                    style={{ height: "38px" }}
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
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Mã nhân viên"
                  name="employee_code"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã nhân viên!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mã nhân viên"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Ngày sinh"
                  name="employee_birthday"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày sinh",
                      type: "date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%", height: "38px" }}
                    onChange={onChange}
                    placeholder="Ngày sinh"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Tên phòng ban"
                  name="employee_department"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phòng ban !",
                      type: "string",
                    },
                  ]}
                >
                  <Select
                    className="selection-group_form"
                    style={{ width: 120 }}
                    onChange={handleChangeDepartment}
                    placeholder="Phòng ban"
                    options={[
                      { value: "pb1", label: "Xây dựng" },
                      { value: "pb2", label: "Điện" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Chức vụ"
                  name="employee_position"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn chức vụ !",
                      type: "string",
                    },
                  ]}
                >
                  <Select
                    className="selection-group_form"
                    style={{ width: 120 }}
                    onChange={handleChangePosition}
                    placeholder="Chức vụ"
                    options={[
                      { value: "position1", label: "Công nhân xây dựng" },
                      { value: "position2", label: "Trưởng nhóm xây dựng" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Tên nhân viên"
                  name="employee_name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên nhân viên"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Giới tính"
                  name="employee_gender"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giới tính!",
                      type: "string",
                    },
                  ]}
                >
                  <Select
                    className="selection-group_form"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    placeholder="Giới tính"
                    options={[
                      { value: "male", label: "Nam" },
                      { value: "female", label: "Nữ" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Quê quán"
                  name="employee_hometown"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập quê quán!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Quê quán"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Lương"
                  name="employee_wage"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập lương!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Lương"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="CMND/CCCD"
                  name="employee_CMND"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập CMND/CCCD!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="CMND/CCCD"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Điện thoại"
                  name="employee_phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Điện thoại"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Nơi ở hiện tại"
                  name="employee_currentAcc"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập nơi ở hiện tại!",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nơi ở hiện tại"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Địa chỉ thường trú"
                  name="employee_permanentAddress"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ thường trú !",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Địa chỉ thường trú"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Thông tin liên hệ khẩn cấp"
                  name="employee_contract"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin liện hệ khẩn cấp !",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Thông tin liên hệ khẩn cấp"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={12} xl={4}>
            <Card border="light" className="text-center p-0 mb-4">
              {!image && (
                <div>
                  <label
                    htmlFor="image_employee"
                    style={{
                      width: "10rem",
                      height: "10rem",
                      lineHeight: "11rem",
                      borderRadius: "50%",
                      border: "1px solid #cccccc",
                      cursor: "pointer",
                      margin: "auto",
                      marginTop: "60px",
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: "36px", color: "#cccccc" }}
                      icon={faPlus}
                    />
                  </label>
                </div>
              )}
              <input
                className="productContent-form__addFile"
                name="image_employee"
                id="image_employee"
                style={{ display: "none" }}
                type="file"
                onChange={handlePreviewAvatar}
              ></input>
              {image && (
                <image
                  style={{
                    backgroundImage: `url(${image.preview})`,
                    objectFit: "cover",
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "50%",
                    margin: "auto",
                    marginTop: "60px",
                    border: "2px solid #cccccc",
                  }}
                  className="profile-cover"
                />
              )}

              <Card.Body className="pb-5">
                <Card.Title>Ảnh đại diện</Card.Title>
                {/* <Card.Subtitle className="fw-normal">Chức vụ</Card.Subtitle> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="signInBtn"
            style={{
              width: "320px",
              backgroundColor: "#262b40",
              height: "38px",
              fontSize: "16px",
              marginTop: "30px",
            }}
          >
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </LayoutPage>
  );
};

export default PageNewEmployee;
