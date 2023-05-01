import { Button, Form, Input, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
const OPTIONS = ["Điện", "Xây dựng"];
const OPTIONSEMPLOYEE = ["Nhân viên 1", "Nhân viên 2"];
const OPTIONSEMPLOYEEMANAGER = ["Quản lý 1", "Quản lý 2"];

const PageNewProject = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsEmployee, setSelectedItemsEmployee] = useState([]);
  const [selectedItemsEmployeeManager, setSelectedItemsEmployeeManager] =
    useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const filteredOptionsEmployee = OPTIONSEMPLOYEE.filter(
    (o) => !selectedItemsEmployee.includes(o)
  );

  const filteredOptionsEmployeeManager = OPTIONSEMPLOYEEMANAGER.filter(
    (o) => !selectedItemsEmployeeManager.includes(o)
  );
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <div>
      <h5>Tạo mới công việc</h5>
      <Form layout="vertical" className="row-col">
        <Row>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Tên dự án"
              name="name_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập dự án!",
                  type: "string",
                },
              ]}
            >
              <Input
                placeholder="Tên dự án"
                className="inputUser input-group_form"
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Quản lý nhóm"
              name="manager_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn Quản lý nhóm!",
                  type: "selector",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn Quản lý nhóm"
                value={selectedItems}
                onChange={setSelectedItemsEmployeeManager}
                style={{
                  width: "100%",
                }}
                options={filteredOptionsEmployeeManager.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Địa điểm công viêc"
              name="place_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa điểm công việc!",
                  type: "string",
                },
              ]}
            >
              <Input
                placeholder="Địa điểm công việc"
                className="inputUser input-group_form"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Phòng ban"
              name="department_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phòng ban!",
                  type: "selector",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn phòng ban"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                  width: "100%",
                }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              className="username"
              label="Công nhân xây dựng"
              name="employee_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhân viên!",
                  type: "selector",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn nhân viên"
                value={selectedItemsEmployee}
                onChange={setSelectedItemsEmployee}
                style={{
                  width: "100%",
                }}
                options={filteredOptionsEmployee.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Item
              className="username label-group_form"
              label="Lý do tăng ca"
              name="reason_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do tăng ca",
                  type: "string",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Tên dự án"
              name="name_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập dự án!",
                  type: "string",
                },
              ]}
            >
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            type="primary"
            className="signInBtn"
            // onClick={showModal}
            style={{
              padding: "0px 20px",
              backgroundColor: "#262b40",
              height: "38px",
              fontSize: "16px",
            }}
          >
            Tạo mới
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PageNewProject;
