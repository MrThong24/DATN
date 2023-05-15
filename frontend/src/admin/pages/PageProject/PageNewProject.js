import { Button, Form, Input, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import apiUser from "../../../api/apiUser";
import apiDepartment from "../../../api/apiDepartment";

const PageNewProject = () => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const handleSelectManagerProject = (value, label) => {};

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

  /* START event filter position_employee and set value position_employee in select */
  const optionsEmployeePosition = useMemo(() => {
    if (newDataStatus.length > 0) {
      return newDataStatus
        ?.filter((item) => item.position_employee === "Trưởng nhóm xây dựng")
        .map((employee) => ({
          value: employee?.code_employee,
          label: employee?.name_employee,
        }));
    }
    return [];
  }, [newDataStatus]);
  /* END event filter position_employee and set value position_employee in select */

  /* START event filter position_department and set value position_department in select */
  const handleChangeDepartment = (value, item) => {
    setSelectedDepartment(item);
  };
  const departmentFormat = useMemo(() => {
    if (dataDepartment.length > 0) {
      return dataDepartment?.map((department) => ({
        value: department?.code,
        label: department?.name,
      }));
    }
    return [];
  }, [dataDepartment]);
  /* END event filter position_department and set value position_department in select */

  /* START event handle filter employee by department */
  const dataEmployeesByDe = useMemo(() => {
    if (selectedDepartment.length > 0) {
      return newDataStatus
        ?.filter((item) =>
          selectedDepartment.some(
            (itemDepartment) =>
              itemDepartment.label === item.department_employee
          )
        )
        .map((employee) => ({
          value: employee?.code_employee,
          label: employee?.name_employee,
        }));
    }
    return [];
  }, [newDataStatus, selectedDepartment]);
  /* END event handle filter employee by department */

  /* START event handle image  */
  const [fileList, setFileList] = useState([]);
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
  console.log(fileList);
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
              label="Trưởng nhóm xây dựng"
              name="manager_project"
              style={{ cursor: "pointer" }}
              rules={[
                {
                  required: true,
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
                style={{
                  width: "100%",
                }}
                options={dataEmployeesByDe}
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
