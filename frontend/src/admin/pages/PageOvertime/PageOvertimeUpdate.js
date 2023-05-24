import apiOvertime from "../../../api/apiOvertime";
import React, { useEffect, useState } from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment-timezone";
import { toast } from "react-toastify";

const PageOvertimeUpdate = ({ idUpdate, onClose }) => {
  const [dataApi, setDataApi] = useState(null);

  const [status, setStatus] = useState(false);

  const [form] = Form.useForm();

  const [dateEnd, setDataEnd] = useState("");

  const [dateStart, setDataStart] = useState("");

  const [registrationDate, setRegistrationDate] = useState("");

  const onChangeStartDate = (e) => {
    setDataStart(e.target.value);
  };

  const onChangeEndDate = (e) => {
    setDataEnd(e.target.value);
  };

  const onChangeRegistration = (e) => {
    setRegistrationDate(e.target.value);
  };

  const handleChangeIsActive = (value) => {};

  useEffect(() => {
    setDataEnd(moment(dataApi?.data?.overtime?.date_end).format("YYYY-MM-DD"));
    setRegistrationDate(
      moment(dataApi?.data?.overtime?.registration_date).format("YYYY-MM-DD")
    );
    setDataStart(
      moment(dataApi?.data?.overtime?.date_start).format("YYYY-MM-DD")
    );
  }, [dataApi]);

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

  /*START Api get details Employee */
  useEffect(() => {
    async function fetchData(idUpdate) {
      const data = await apiOvertime.getOvertimeId(idUpdate);
      console.log();
      form.setFieldsValue({
        _id: data?.data?.overtime?._id,
        phone: data?.data?.overtime.phone,
        content: data?.data?.overtime.content,
      });
      setStatus(data?.data?.overtime?.isActive); // Set the status value from the fetched data
      setDataApi(data);
    }
    if (idUpdate) {
      fetchData(idUpdate);
    }
  }, [idUpdate]);
  /*END Api get details Employee */

  /* START event update overtime */
  const onFinish = async (values) => {
    const dataForm = new FormData();
    dataForm.append("registration_date", registrationDate);
    dataForm.append("date_start", dateStart);
    dataForm.append("date_end", dateEnd);
    Object.entries(values).forEach(([key, value]) => {
      dataForm.append(key, value);
    });
    try {
      await apiOvertime.updateOvertimeId(idUpdate, dataForm).then((data) => {});
      onClose();
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };
  /* END event update overtime */

  const [isReadOnly, setIsReadOnly] = useState(true);

  // Hàm xử lý khi bấm vào nút "Test"
  const handleTestButtonClick = () => {
    setIsReadOnly(false);
  };

  return (
    <>
      <h5 className="mb-4">
        Chi tiết tăng ca /{" "}
        {dataApi?.data?.overtime?.name_employee?.name_employee}
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
                readOnly
                style={{
                  width: "100%",
                  height: "38px",
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  padding: "4px 11px",
                }}
                type="date"
                id="registration_date"
                name="registration_date"
                value={registrationDate}
                onChange={onChangeRegistration}
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Trạng thái"
              name="isActive"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trạng thái án !",
                  type: "string",
                },
              ]}
            >
              <Select
                disabled={isReadOnly}
                className="selection-group_form"
                style={{ width: 120 }}
                placeholder="Trạng thái"
                onChange={handleChangeIsActive}
                options={[
                  { value: "true", label: "Duyệt" },
                  { value: "false", label: "Chưa duyệt" },
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
              // name="date_start"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu !",
                  type: "date",
                },
              ]}
            >
              <input
                readOnly
                style={{
                  width: "100%",
                  height: "38px",
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  padding: "4px 11px",
                }}
                type="date"
                id="date_start"
                name="date_start"
                value={dateStart}
                onChange={onChangeStartDate}
              />
              {/* <DatePicker
                style={{ width: "100%", height: "38px" }}
                onChange={onChangeStartDate}
                placeholder="Thời gian bắt đầu"
              /> */}
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
                readOnly
                style={{
                  width: "100%",
                  height: "38px",
                  borderRadius: "6px",
                  border: "1px solid #d9d9d9",
                  padding: "4px 11px",
                }}
                type="date"
                id="date_end"
                name="date_end"
                value={dateEnd}
                onChange={onChangeEndDate}
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Số điện thoại"
              name="phone"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập số điện thoại và nhập đủ 10 số!",
              //     pattern: /^[0-9]{10}$/,
              //     type: "string",
              //   },
              // ]}
            >
              <Input
                readOnly
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
            >
              <TextArea readOnly rows={4} />
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
    </>
  );
};

export default PageOvertimeUpdate;
