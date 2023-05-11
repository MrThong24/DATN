/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import apiDepartment from "../../../api/apiDepartment";
import { toast } from "react-toastify";
import moment from "moment-timezone";
const DetailEmployee = () => {
  const [image, setImage] = useState();
  const [imageAfter, setImageAfter] = useState();
  const [imageTest, setImageTest] = useState(true);
  const [dataDepartment, setDataDepartment] = useState(null);
  const [dataApi, setDataApi] = useState(null);

  const { id } = useParams();

  const [form] = Form.useForm();

  const [selectStatus, setSelectStatus] = useState(null);
  const handleChangeStatus = (value, label) => {
    setSelectStatus(label?.label);
  };

  const handleChange = (value) => {};
  const handleChangeDepartment = (value) => {};
  const handleChangePosition = (value) => {};
  const onChange = (date, dateString) => {};

  /* START event notify */
  const notifySuccess = () => {
    toast.success(" Cập nhật thông tin nhân viên thành công!", {
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
    toast.error(" Cập nhật thông tin thất bại!", {
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

  /*START Api get details Employee */
  useEffect(() => {
    async function fetchData(id) {
      const data = await apiUser.getUserId(id);
      form.setFieldsValue({
        _id: data._id,
        account_employee: data.account_employee,
        password_employee: data.password_employee,
        name_employee: data.name_employee,
        code_employee: data.code_employee,
        address_employee: data.address_employee,
        department_employee: data.department_employee,
        position_employee: data.position_employee,
        cmnd_employee: data.cmnd_employee,
        phone_employee: data.phone_employee,
        gender_employee: data.gender_employee,
        current_residence: data.current_residence,
        date_of_birth: moment(data.date_of_birth, "YYYY-MM-DD"),
        wage_employee: data.wage_employee,
        status: data.status,
      });
      setDataApi(data);
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);
  /*END Api get details Employee */

  /*START Hàm lấy dữ liệu Department */
  useEffect(() => {
    async function fetchData() {
      const data = await apiDepartment.getAllDepartment();
      setDataDepartment(data);
    }
    fetchData();
  }, []);
  /*END Hàm lấy dữ liệu Department */

  /* STAR tạo ra đổi tượng options lấy dữ liệu của dataDepartment */
  const options = dataDepartment?.data?.map((department) => ({
    value: department?.code,
    label: department?.name,
  }));
  /* END tạo ra đổi tượng options lấy dữ liệu của dataDepartment */

  /* START Update Api Employee Id */
  const onFinish = async (values) => {
    values.status = selectStatus;
    values.image = imageAfter;
    const dataForm = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      dataForm.append(key, value);
    });
    try {
      await apiUser.editUser(id, dataForm).then((data) => {});
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };
  /* END Update Api Employee Id */

  /* START event sử lý image */
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
      imageAfter && URL.revokeObjectURL(imageAfter.preview);
    };
  });
  const handlePreviewAvatar = (e) => {
    setImageTest(false);
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      file.preview = URL.createObjectURL(file);
      setImageAfter(file);
    }
  };
  /* END even sử lý image */

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
          / {dataApi?.account_employee}
        </h5>
        <Form
          layout="vertical"
          className="row-col"
          form={form}
          onFinish={onFinish}
        >
          <Row className="mt-5">
            <Col xs={12} xl={8}>
              <Row>
                <Col md={6}>
                  <Form.Item
                    className="username label-group_form"
                    label="Trạng thái"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin liện hệ khẩn cấp !",
                        type: "string",
                      },
                    ]}
                  >
                    <Select
                      className="selection-group_form"
                      style={{ width: 120 }}
                      onChange={handleChangeStatus}
                      placeholder="Trạng thái"
                      options={[
                        { value: "1", label: "Đang hoạt động" },
                        { value: "2", label: "Ngưng hoạt động" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Item
                    className="username label-group_form"
                    label="Tên tài khoản"
                    name="account_employee"
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
                    label="Mã nhân viên"
                    name="_id"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã nhân viên!",
                        type: "string",
                      },
                    ]}
                  >
                    <Input
                      disabled
                      placeholder="Mã nhân viên"
                      className="inputUser input-group_form"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Item
                    className="username label-group_form"
                    label="Tên nhân viên"
                    name="name_employee"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập nhân viên!",
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
                    label="Ngày sinh"
                    name="date_of_birth"
                    rules={[
                      {
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
                    name="department_employee"
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
                      options={options}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    className="username label-group_form"
                    label="Chức vụ"
                    name="position_employee"
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
                    label="Giới tính"
                    name="gender_employee"
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
                <Col md={6}>
                  <Form.Item
                    className="username label-group_form"
                    label="Địa chỉ thường trú"
                    name="address_employee"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Địa chỉ thường trú!",
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
                    label="Quê quán"
                    name="current_residence"
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
                    name="wage_employee"
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
                    name="cmnd_employee"
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
                    name="phone_employee"
                  >
                    <Input
                      placeholder="Điện thoại"
                      className="inputUser input-group_form"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={12} xl={4}>
              <Card border="light" className="text-center p-0 mb-4">
                <div
                  style={{
                    backgroundImage: `url(${ProfileCover})`,
                    position: "relative",
                  }}
                  className="profile-cover rounded-top"
                />
                <Card.Body className="pb-8">
                  {imageTest && (
                    <img
                      src={`http://localhost:5000/${dataApi?.image}`}
                      href=""
                      style={{
                        position: "absolute",
                        top: "120px",
                        left: "112px",
                      }}
                      className="profileCover"
                    />
                  )}
                  {!imageTest && (
                    <div>
                      <image
                        style={{
                          backgroundImage: `url(${imageAfter.preview})`,
                          position: "absolute",
                          top: "120px",
                          left: "112px",
                        }}
                        className="profileCover"
                      />
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
                  <label
                    htmlFor="image_employee"
                    style={{
                      lineHeight: "11rem",
                      cursor: "pointer",
                      position: "absolute",
                      top: "218px",
                      left: "146px",
                    }}
                    className="profileCoverLabel"
                  >
                    Thay đổi
                  </label>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DetailEmployee;
