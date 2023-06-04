import apiOvertime from "../../../api/apiOvertime";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import apiProduct from "../../../api/apiProduct";

const PageOvertimeManagerUpdate = () => {
  const [dataApi, setDataApi] = useState(null);

  const [status, setStatus] = useState(false);

  const [form] = Form.useForm();

  const { id } = useParams();

  const [registrationDateValue, setRegistrationDateValue] = useState("");

  const onChangeRegistrationDate = (e) => {
    setRegistrationDateValue(e.target.value);
  };

  const [dateStartValue, setDateStartValue] = useState("");
  const onChangeStartDate = (e) => {
    setDateStartValue(e.target.value);
  };

  const [dateEndValue, setDateEndValue] = useState("");
  const onChangeEndDate = (e) => {
    setDateEndValue(e.target.value);
  };
  const handleChangeOvertimeProject = (value, label) => {};

  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    setDateEndValue(
      moment(dataApi?.data?.overtime?.date_end).format("YYYY-MM-DD")
    );
    setRegistrationDateValue(
      moment(dataApi?.data?.overtime?.registration_date).format("YYYY-MM-DD")
    );
    setDateStartValue(
      moment(dataApi?.data?.overtime?.date_start).format("YYYY-MM-DD")
    );
  }, [dataApi]);

  // Hàm xử lý khi bấm vào nút "Test"
  const handleTestButtonClick = () => {
    setIsReadOnly(false);
  };

  /* START event update overtime */
  useEffect(() => {
    async function fetchData(id) {
      const data = await apiOvertime.getOvertimeId(id);
      form.setFieldsValue({
        _id: data?.data?.overtime?._id,
        phone: data?.data?.overtime.phone,
        content: data?.data?.overtime.content,
        name_project: data?.data?.overtime?.name_project?.name_project,
      });
      setStatus(data?.data?.overtime?.isActive); // Set the status value from the fetched data
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
  const notifyErrors = () => {
    toast.error("Lịch đã được duyệt ko được cập nhât!", {
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

  const handleError = () => {
    notifyErrors();
  };
  const [userId, setUserId] = useState([]);

  /* START get userInfo data from localStorage */
  useEffect(() => {
    const id =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    setUserId(JSON.parse(id));
  }, []);
  /* END get userInfo data from localStorage */

  const [dataAPI, setDataAPI] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await apiProduct.getAllProject();
      setDataAPI(data);
    }
    fetchData();
  }, []);
  const optionsProject = dataAPI?.data
    ?.filter(
      (item) =>
        item.statusOvertime === true &&
        item.manager_project.some((manager) => manager._id === userId._id)
    )
    ?.map((item) => ({
      value: item._id,
      label: item.name_project,
    }));
  /* START event update overtime */
  const onFinish = async (values) => {
    const dataForm = new FormData();
    dataForm.append("date_end", dateEndValue);
    dataForm.append("date_start", dateStartValue);
    dataForm.append("registration_date", registrationDateValue);
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
            Chi tiết tăng ca
          </Link>
          / {dataApi?.data?.overtime?.name_project?.name_project}
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
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày tăng ca !",
                    type: "date",
                  },
                ]}
              >
                <input
                  readOnly={isReadOnly}
                  style={{
                    width: "100%",
                    height: "38px",
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    padding: "4px 11px",
                  }}
                  type="date"
                  name="registration_date"
                  id="registration_date"
                  value={registrationDateValue}
                  onChange={onChangeRegistrationDate}
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
                  disabled={isReadOnly}
                  className="selection-group_form"
                  style={{ width: 120 }}
                  placeholder="Tên dự án"
                  onChange={handleChangeOvertimeProject}
                  options={optionsProject}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Item
                className="username label-group_form"
                label="Thời gian bắt đầu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian bắt đầu !",
                    type: "date",
                  },
                ]}
              >
                <input
                  readOnly={isReadOnly}
                  style={{
                    width: "100%",
                    height: "38px",
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    padding: "4px 11px",
                  }}
                  type="date"
                  name="date_end"
                  id="date_end"
                  value={dateStartValue}
                  onChange={onChangeStartDate}
                />
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item
                className="username label-group_form"
                label="Thời gian kết thúc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian kết thúc !",
                    type: "date",
                  },
                ]}
              >
                <input
                  readOnly={isReadOnly}
                  style={{
                    width: "100%",
                    height: "38px",
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    padding: "4px 11px",
                  }}
                  type="date"
                  name="date_end"
                  id="date_end"
                  value={dateEndValue}
                  onChange={onChangeEndDate}
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
                    message: "Vui lòng nhập số điện thoại và nhập đủ 10 số!",
                    pattern: /^[0-9]{10}$/,
                    type: "string",
                  },
                ]}
              >
                <Input
                  readOnly={isReadOnly}
                  maxLength={10}
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
                <TextArea readOnly={isReadOnly} rows={4} />
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
            {!isReadOnly ? (
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
            ) : status === false ? (
              <div
                style={{
                  width: "320px",
                  backgroundColor: "#262b40",
                  height: "38px",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: "6px",
                  textAlign: "center",
                  lineHeight: "38px",
                  cursor: "pointer",
                }}
                onClick={handleTestButtonClick}
              >
                Cập nhật
              </div>
            ) : (
              <div
                style={{
                  width: "320px",
                  backgroundColor: "#262b40",
                  height: "38px",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: "6px",
                  textAlign: "center",
                  lineHeight: "38px",
                  cursor: "pointer",
                }}
                onClick={handleError}
              >
                Cập nhật
              </div>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PageOvertimeManagerUpdate;
