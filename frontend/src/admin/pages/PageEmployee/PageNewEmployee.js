import React, { useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LayoutPage from "../../Layout/LayoutPage";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import apiUser from "../../../api/apiUser";
import apiDepartment from "../../../api/apiDepartment";
import "../../../styles/employee.css";
import { toast } from "react-toastify";
const PageNewEmployee = ({ onClose }) => {
  const [image, setImage] = useState();

  const [dataAPI, setDataAPI] = useState(null);

  const [dataAll, setDataAll] = useState(null);

  const [selectedPositionLabel, setSelectedPositionLabel] = useState("");

  const [selectedGender, setSelectedGender] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("Đang hoạt động");

  const [selectDepartment, setSelectDepartment] = useState("");

  const handleChangeGender = (value, label) => {
    setSelectedGender(label?.label);
  };
  const handleChangeDepartment = (value, label) => {
    setSelectDepartment(label?.label);
  };
  const handleChangePosition = (value, label) => {
    setSelectedPositionLabel(label?.label);
  };

  const onChangeDate = (date, dateString) => {
    setSelectedDate(dateString);
  };

  /* START event notify */
  const notifySuccess = () => {
    toast.success(" Tạo mới nhân viên thành công !", {
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
    toast.error(" Tạo mới nhân viên thất bại!", {
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

  /* START event sử lý image */
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  });
  const handlePreviewAvatar = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
  };
  /* END even sử lý image */

  /* START event call API get all Employee */
  useEffect(() => {
    async function fetchData() {
      const data = await apiUser.getAllUser();
      setDataAll(data);
    }
    fetchData();
  }, []);
  /* END event call API get all Employee */

  /* START event call API get all Department */
  useEffect(() => {
    async function fetchData() {
      const data = await apiDepartment.getAllDepartment();
      setDataAPI(data);
    }
    fetchData();
  }, []);
  /* END event call API get all Department */

  /* STAR tạo ra đổi tượng options lấy dữ liệu của dataDepartment */
  const options = dataAPI?.data?.map((department) => ({
    value: department?.code,
    label: department?.name,
  }));
  /* END tạo ra đổi tượng options lấy dữ liệu của dataDepartment */

  /* START even create new employee */
  const onFinish = async (values) => {
    const date = values.date_of_birth.format("YYYY-MM-DD");
    values.date_of_birth = date;
    values.department_employee = selectDepartment;
    values.position_employee = selectedPositionLabel;
    values.gender_employee = selectedGender;
    values.date_of_birth = selectedDate;
    values.status = selectedStatus;
    values.image = image;
    const dataForm = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      dataForm.append(key, value);
    });
    try {
      await apiUser.createUser(dataForm).then((data) => {});
      onClose();
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };
  /* END even create new employee */

  return (
    <LayoutPage title="Tạo mới nhân viên">
      <Form layout="vertical" className="row-col" onFinish={onFinish}>
        <Row className="mt-5">
          <Col xs={12} xl={8}>
            <Col md={6}>
              <Form.Item
                className="username label-group_form"
                label="Trạng thái"
                name="status"
              >
                <Select
                  className="selection-group_form"
                  style={{ width: 120 }}
                  placeholder="Trạng thái"
                  defaultValue="Đang hoạt động"
                  disabled
                  options={[{ value: "1", label: "Đang hoạt động" }]}
                />
              </Form.Item>
            </Col>
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Tên tài khoản"
                  name="account_employee"
                  rules={[
                    {
                      required: true,
                      validator: async (rule, value) => {
                        if (!value) {
                          throw new Error("Vui lòng nhập tài khoản!");
                        }

                        const isAccountExist = dataAll?.data.some(
                          (item) => item.account_employee === value
                        );
                        if (isAccountExist) {
                          throw new Error("Tài khoản đã tồn tại!");
                        }
                      },
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
                  name="password_employee"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
                    autocomplete="new-password"
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
                  label="Tên nhân viên"
                  name="name_employee"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Tên nhân viên!",
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
                      required: true,
                      message: "Vui lòng nhập ngày sinh",
                      type: "date",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Ngày sinh"
                    style={{ width: "100%", height: "38px" }}
                    onChange={onChangeDate}
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
                  label="Địa chỉ thường trú"
                  name="address_employee"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ thường trú!",
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
                    onChange={handleChangeGender}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập CMND/CCCD!",
                      validator: (_, value) => {
                        const regex = /^[0-9\b]+$/; // kiểm tra giá trị nhập vào chỉ chứa số
                        if (value && regex.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Vui lòng nhập số và không chứa ký tự đặc biệt!"
                        );
                      },
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
                  name="phone_employee"
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
                    maxLength={10}
                    placeholder="Điện thoại"
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
                <div style={{ marginTop: "60px" }}>
                  <image
                    style={{
                      backgroundImage: `url(${image.preview})`,
                    }}
                    className="profileCover"
                  />
                  <label
                    htmlFor="image_employee"
                    style={{
                      lineHeight: "11rem",
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    className="profileCoverLabel"
                  >
                    Thay đổi
                  </label>
                </div>
              )}

              <Card.Body className="pb-5">
                <Card.Title>Ảnh đại diện</Card.Title>
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
