import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { DatePickerProps } from "antd";

import {
  Layout,
  Button,
  Form,
  Input,
  Checkbox,
  Select,
  DatePicker,
} from "antd";
import "../Form/form.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export const GeneralInfoForm = () => {
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
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Tạo mới nhân viên</h5>
        <Form
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          <Row>
            <Col md={6}>
              <Form.Item
                className="username label-group_form"
                label="Tên tài khoản"
                name="employee_tk"
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
                label="Tên phòng ban"
                name="employee_department"
              >
                <Select
                  className="selection-group_form"
                  style={{ width: 120 }}
                  onChange={handleChangeDepartment}
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
              >
                <Select
                  className="selection-group_form"
                  style={{ width: 120 }}
                  onChange={handleChangePosition}
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
              >
                <DatePicker
                  style={{ width: "100%", height: "38px" }}
                  onChange={onChange}
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
                name="employee_department"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính!",
                  },
                ]}
              >
                <Select
                  className="selection-group_form"
                  style={{ width: 120 }}
                  onChange={handleChange}
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
                label="Chức vụ"
                name="employee_position"
              >
                <Input
                  placeholder="Chức vụ"
                  className="inputUser input-group_form"
                />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item
                className="username label-group_form"
                label="Quê quán"
                name="employee_hometown"
              >
                <Input
                  placeholder="Quê quán"
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
              >
                <Input
                  placeholder="Thông tin liên hệ khẩn cấp"
                  className="inputUser input-group_form"
                />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item
                className="username label-group_form"
                label="Lương"
                name="employee_wage"
              >
                <Input
                  placeholder="Lương"
                  className="inputUser input-group_form"
                />
              </Form.Item>
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
              }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card.Body>
    </Card>
  );
};
