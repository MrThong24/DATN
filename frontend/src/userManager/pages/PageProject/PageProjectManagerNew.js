import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import apiUser from "../../../api/apiUser";
import apiDepartment from "../../../api/apiDepartment";
import apiProduct from "../../../api/apiProduct";
import apiNotification from "../../../api/apiNotification";
import moment from "moment-timezone";
import { toast } from "react-toastify";

const PageProjectManagerNew = ({ onClose }) => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [userManager, setUserManager] = useState([]);
  const [userCN, setuserCN] = useState([]);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const notifySuccess = () => {
    toast.success(" Tạo mới công việc thành công !", {
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
  const onChangeDate = (date, dateString) => {
    setSelectedDateStart(dateString);
  };
  const onChangeDateEnd = (date, dateString) => {
    setSelectedDateEnd(dateString);
  };
  console.log(selectedDateStart);
  const handleSelectManagerProject = (value, label) => {
    setUserManager(value);
  };
  const handleSelectCNProject = (value, label) => {
    setuserCN(value);
  };
  /* START event call api all employee and all department */
  useEffect(() => {
    async function fetchData() {
      const dataEmployee = await apiUser.getAllUser();
      const dataDepartment = await apiDepartment.getAllDepartment();
      setDataEmployee(dataEmployee?.data);
      setDataDepartment(dataDepartment?.data);
    }
    fetchData();
  }, []);
  /* END event call api all employee */

  const newDataStatus = dataEmployee?.filter(
    (item) => item.status === "Đang hoạt động"
  );

  const newUser = newDataStatus?.filter(
    (item) => item?.position_employee === "Công nhân xây dựng"
  );

  /* START event filter position_employee and set value position_employee in select */
  const optionsEmployeePosition = useMemo(() => {
    if (newDataStatus.length > 0) {
      return newDataStatus
        ?.filter((item) => item.position_employee === "Trưởng nhóm xây dựng")
        .map((employee) => ({
          value: employee?._id,
          label: employee?.name_employee,
        }));
    }
    return [];
  }, [newDataStatus]);

  const handleChangeDepartment = (value, item) => {
    setSelectedDepartment(item);
    setSelectedDepartments(value);
  };
  const departmentFormat = useMemo(() => {
    if (dataDepartment.length > 0) {
      return dataDepartment?.map((department) => ({
        value: department?._id,
        label: department?.name,
      }));
    }
    return [];
  }, [dataDepartment]);

  const dataEmployeesByDe = useMemo(() => {
    if (selectedDepartment.length > 0) {
      return newUser
        ?.filter((item) =>
          selectedDepartment.some(
            (itemDepartment) =>
              itemDepartment.label === item.department_employee
          )
        )
        .map((employee) => ({
          value: employee?._id,
          label: employee?.name_employee,
        }));
    }
    return [];
  }, [newUser, selectedDepartment]);

  const onFinish = async (values) => {
    const { name_project, place_project, reason_project } = values;
    try {
      await apiProduct
        .createProject({
          name_project,
          manager_project: [...userManager],
          department_project: [...selectedDepartments],
          worker_project: [...userCN],
          place_project,
          reason_project,
          date_start: selectedDateStart,
          date_end: selectedDateEnd,
        })
        .then((data) => {
          const list = [...userManager, ...userCN].map((item) => {
            return { id_user: item, status_notification: false };
          });
          apiNotification.createNotification({
            id_project: data.data._id,
            list_user: list,
          });
        });
      onClose();
      notifySuccess();
    } catch (error) {
      // notifyError();
    }
  };
  return (
    <div>
      <h5>Tạo mới công việc</h5>
      <Form layout="vertical" className="row-col" onFinish={onFinish}>
        <Row>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Tên dự án"
              name="name_project"
              rules={[
                {
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
              label="Trưởng nhóm xây dựng"
              name="manager_project"
              style={{ cursor: "pointer" }}
              rules={[
                {
                  message: "Vui lòng chọn trưởng nhóm!",
                  type: "selector",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn trưởng nhóm"
                onChange={handleSelectManagerProject}
                style={{
                  width: "100%",
                }}
                options={optionsEmployeePosition}
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
                  message: "Vui lòng chọn phòng ban!",
                  type: "selector",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn phòng ban"
                onChange={handleChangeDepartment}
                style={{
                  width: "100%",
                }}
                options={departmentFormat}
              />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              className="username"
              label="Công nhân xây dựng"
              name="worker_project"
              rules={[
                {
                  message: "Vui lòng chọn nhân viên!",
                  type: "selector",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn nhân viên"
                onChange={handleSelectCNProject}
                style={{
                  width: "100%",
                }}
                options={dataEmployeesByDe}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Ngày bắt đầu"
              name="date_start"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày bắt đầu",
                  type: "date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%", height: "38px" }}
                onChange={onChangeDate}
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Ngày kết thúc"
              name="date_end"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày kết thúc",
                  type: "date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%", height: "38px" }}
                onChange={onChangeDateEnd}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Item
              className="username label-group_form"
              label="Nội dung công việc"
              name="reason_project"
              rules={[
                {
                  message: "Vui lòng nhập nội dung công việc",
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
            marginBottom: "20px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="signInBtn"
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

export default PageProjectManagerNew;
