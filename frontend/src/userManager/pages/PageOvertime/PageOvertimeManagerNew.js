import React, { useEffect, useState } from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { Button, Form, Input, Select, DatePicker } from "antd";
import apiOvertime from "../../../api/apiOvertime";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import LayoutPage from "../../layout/LayoutPage";

const PageOvertimeManagerNew = ({ onClose }) => {
  const onChange = (date, dateString) => {};

  const onChangeStartDate = (date, dateString) => {};

  const onChangeEndDate = (date, dateString) => {};

  const handleChangeOvertimeProject = (value) => {};

  const [userId, setUserId] = useState([]);

  /* START event Notify */
  const notifySuccess = () => {
    toast.success(" Đăng ký tăng ca thành công !", {
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
  const notifyError = () => {
    toast.error(" Đăng ký tăng ca thất bại!", {
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
  /* END event Notify */

  /* START get userInfo data from localStorage */
  useEffect(() => {
    const id =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    setUserId(JSON.parse(id));
  }, []);
  /* END get userInfo data from localStorage */

  /* START event create overtime */
  const onFinish = async (values) => {
    const {
      registration_date,
      phone,
      name_project,
      date_start,
      date_end,
      content,
    } = values;

    const dataForm = new FormData();
    dataForm.append("registration_date", registration_date);
    dataForm.append("phone", phone);
    dataForm.append("name_employee", userId._id);
    // dataForm.append("name_project", name_project);
    dataForm.append("date_start", date_start);
    dataForm.append("date_end", date_end);
    dataForm.append("content", content);
    try {
      await apiOvertime.addOvertime(dataForm).then((data) => {
        onClose();
        notifySuccess();
      });
    } catch (error) {
      notifyError();
    }
  };
  /* END event create overtime */
  return (
    <LayoutPage title="Đăng ký tăng ca">
      <Form layout="vertical" className="row-col" onFinish={onFinish}>
        <Row>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Ngày đăng ký tăng ca"
              name="registration_date"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày tăng ca !",
                  type: "date",
                },
              ]}
            >
              <DatePicker
                placeholder="Ngày đăng ký tăng ca"
                style={{ width: "100%", height: "38px" }}
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Tên dự án"
              name="name_project"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tên dự án !",
                  type: "string",
                },
              ]}
            >
              <Select
                className="selection-group_form"
                style={{ width: 120 }}
                placeholder="Tên dự án"
                onChange={handleChangeOvertimeProject}
                options={[
                  { value: "project_1", label: "Dự án 1" },
                  { value: "project_2", label: "Dự án 2" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Thời gian bắt đầu"
              name="date_start"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu !",
                  type: "date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%", height: "38px" }}
                onChange={onChangeStartDate}
                placeholder="Thời gian bắt đầu"
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Thời gian kết thúc"
              name="date_end"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian kết thúc !",
                  type: "date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%", height: "38px" }}
                onChange={onChangeEndDate}
                placeholder="Thời gian kết thúc"
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại !",
                },
              ]}
            >
              <Input
                placeholder="Số điện thoại"
                className="inputUser input-group_form"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Item
              className="username label-group_form"
              label="Lý do tăng ca"
              name="content"
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
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
            Đăng ký
          </Button>
        </div>
      </Form>
    </LayoutPage>
  );
};

export default PageOvertimeManagerNew;
