import React from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, DatePicker, Form, Input, Select } from "antd";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";

const EditPageProfile = () => {
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
    <Form
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      layout="vertical"
      className="row-col"
    >
      <h5 style={{ marginBottom: "48px" }}>Chỉnh sửa thông tin cá nhân</h5>
      <Row>
        <Col xs={12} xl={8}>
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
                  },
                ]}
              >
                <Select
                  className="selection-group_form"
                  placeholder="Giới tính"
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
                label="Tên phòng ban"
                name="employee_department"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phòng ban !",
                  },
                ]}
              >
                <Select
                  className="selection-group_form"
                  style={{ width: 120 }}
                  placeholder="Tên phòng ban"
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
                placeholder="Chức vụ"
              >
                <Select
                  className="selection-group_form"
                  style={{ width: 120 }}
                  onChange={handleChangePosition}
                  disabled={true}
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
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày sinh !",
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
                label="Quê quán"
                name="employee_hometown"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập quê quán !",
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
                label="Nơi ở hiện tại"
                name="employee_currentAcc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nơi ở hiện tại !",
                  },
                ]}
              >
                <Input
                  placeholder="Nơi ở hiện tại"
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
                    message: "Vui lòng nhập CMND/CCCD !",
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
                    message: "Vui lòng nhập số điện thoại !",
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
                label="Thông tin liên hệ khẩn cấp"
                name="employee_contract"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin liên hệ !",
                  },
                ]}
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
                  disabled={true}
                  className="inputUser input-group_form"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="text-center p-0 mb-4">
                <div
                  style={{ backgroundImage: `url(${ProfileCover})` }}
                  className="profile-cover rounded-top"
                />
                <Card.Body className="pb-5">
                  <Card.Img
                    src={Profile1}
                    alt="Neil Portrait"
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                  />
                  <Card.Title>Bùi Chí Thông</Card.Title>
                  <Card.Subtitle className="fw-normal">
                    Kỹ sư xây dựng
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPageProfile;
