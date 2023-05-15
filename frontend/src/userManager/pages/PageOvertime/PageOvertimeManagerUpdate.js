import apiOvertime from "../../../api/apiOvertime";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment-timezone";
import { toast } from "react-toastify";

const PageOvertimeManagerUpdate = () => {
  const [dataApi, setDataApi] = useState(null);

  const [form] = Form.useForm();

  const { id } = useParams();

  const [dateEnd, setDataEnd] = useState("");

  const onChange = (date, dateString) => {};

  const onChangeStartDate = (date, dateString) => {};

  const onChangeEndDate = (date, dateString) => {
    setDataEnd(dateString);
  };

  const handleChangeOvertimeProject = (value) => {};

  /* START event update overtime */
  useEffect(() => {
    async function fetchData(id) {
      const data = await apiOvertime.getOvertimeId(id);
      form.setFieldsValue({
        _id: data?.data?.overtime?._id,
        phone: data?.data?.overtime.phone,
        content: data?.data?.overtime.content,
        date_end: moment(data?.data?.overtime.date_end, "YYYY-MM-DD"),
        registration_date: moment(
          data?.data?.overtime.registration_date,
          "YYYY-MM-DD"
        ),
        date_start: moment(data?.data?.overtime.date_start, "YYYY-MM-DD"),
      });
      setDataApi(data);
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);
  /* END event update overtime */

  /* START event Notify */
  const notifySuccess = () => {
    toast.success("Cập nhật lịch tăng ca thành công !", {
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
    toast.error("Cập nhật lịch tăng ca thất bại!", {
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

  /* START event update overtime */
  const onFinish = async (values) => {
    const dataForm = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      dataForm.append(key, value);
    });
    try {
      await apiOvertime.updateOvertimeId(id, dataForm).then((data) => {});
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };
  /* END event update overtime */
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-5">
          <Link
            style={{ cursor: "pointer", marginRight: "6px" }}
            to="/dashboard/employee"
          >
            Quản lý nhân viên
          </Link>
          {/* / {dataApi?.account_employee} */}
        </h5>
        <Form
          layout="vertical"
          className="row-col"
          form={form}
          onFinish={onFinish}
        >
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
                // name="name_project"
                rules={[
                  {
                    // required: true,
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
              Cập nhật
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PageOvertimeManagerUpdate;
