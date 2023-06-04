import { Button, Form, Input, Select, Upload } from "antd";
import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import apiUser from "../../../api/apiUser";
import apiDepartment from "../../../api/apiDepartment";
import apiProduct from "../../../api/apiProduct";
import LayoutPage from "../../Layout/LayoutPage";
import { useParams } from "react-router";
import moment from "moment";
import { toast } from "react-toastify";

const PageDetailProject = () => {
  const { id } = useParams();

  const [form] = Form.useForm();

  const [dataAPI, setDataApi] = useState(null);

  const [dataEmployee, setDataEmployee] = useState([]);

  const [dataDepartment, setDataDepartment] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState([]);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const [userWorkerProject, setUserWorkerProject] = useState([]);

  const [dateStart, setDateStart] = useState("");

  const [dateEnd, setDateEnd] = useState("");

  const [isReadOnly, setIsReadOnly] = useState(true);

  const [status, setStatus] = useState();

  const handleChangeStatus = (value, label) => {
    setStatus(value);
  };

  const handleSelectWorkerProject = (value, label) => {
    setUserWorkerProject(value);
  };

  const handleChangeDepartment = (value, item) => {
    setSelectedDepartment(item);
    setSelectedDepartments(value);
  };

  const handleComFirmError = () => {
    notifyErrors();
  };

  const onChangeDateStart = (e) => {
    setDateStart(e.target.value);
  };

  const onChangeDateEnd = (e) => {
    setDateEnd(e.target.value);
  };

  const handleConfirmButton = () => {
    setIsReadOnly(false);
  };

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

  const manager_project = Form.useWatch("manager_project", form);
  const department_project = Form.useWatch("department_project", form);
  const worker_project = Form.useWatch("worker_project", form);

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

  /*START Api get details Employee */
  useEffect(() => {
    async function fetchData(id) {
      const data = await apiProduct.getProjectId(id);
      form.setFieldsValue({
        _id: data._id,
        name_project: data?.data?.name_project,
        manager_project: data?.data?.manager_project.map((item) => item._id),
        place_project: data?.data?.place_project,
        department_project: data?.data?.department_project.map(
          (item) => item?._id
        ),
        worker_project: data?.data?.worker_project.map((item) => item?._id),
        reason_project: data?.data?.reason_project,
        status: data?.data?.status === true ? "Hoàn thành" : "Đang thực hiện",
        statusOvertime: data?.data?.statusOvertime ? "true" : "false",
      });
      const listDepartmentProject = data?.data?.department_project?.map(
        (item) => ({
          value: item._id,
          label: item.name,
        })
      );

      setSelectedDepartment(listDepartmentProject);
      setStatus(data?.data?.status);
      setDataApi(data);
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);
  /*END Api get details Employee */

  useEffect(() => {
    setDateStart(moment(dataAPI?.data?.date_start).format("YYYY-MM-DD"));
    setDateEnd(moment(dataAPI?.data?.date_end).format("YYYY-MM-DD"));
  }, [dataAPI]);

  const onFinish = async (values) => {
    const { name_project, place_project, reason_project, statusOvertime } =
      values;
    try {
      await apiProduct.updateProjectId(id, {
        name_project,
        manager_project: [...manager_project],
        department_project: [...department_project],
        worker_project: [...worker_project],
        place_project,
        reason_project,
        date_start: dateStart,
        date_end: dateEnd,
        statusOvertime,
        status: status,
      });

      // onClose();
      notifySuccess();
    } catch (error) {
      // notifyError();
    }
  };

  return (
    <LayoutPage title="Chi tiết công việc">
      <Form
        layout="vertical"
        className="row-col"
        form={form}
        onFinish={onFinish}
      >
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
              {dataAPI?.data?.status === true ? (
                <Input
                  disabled={isReadOnly}
                  placeholder="Tên dự án"
                  className="inputUser input-group_form"
                />
              ) : (
                <Input
                  readOnly
                  placeholder="Tên dự án"
                  className="inputUser input-group_form"
                />
              )}
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
                disabled={isReadOnly}
                mode="multiple"
                placeholder="Chọn trưởng nhóm"
                style={{
                  width: "100%",
                }}
              >
                {optionsEmployeePosition?.map(({ value, label }) => (
                  <Select.Option
                    value={value}
                    style={{
                      display: manager_project?.includes(value) ? "none" : "",
                    }}
                    label={label}
                  >
                    {label}
                  </Select.Option>
                ))}
              </Select>
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
              {dataAPI?.data?.status === true ? (
                <Input
                  disabled={isReadOnly}
                  placeholder="Địa điểm công việc"
                  className="inputUser input-group_form"
                />
              ) : (
                <Input
                  readOnly
                  placeholder="Địa điểm công việc"
                  className="inputUser input-group_form"
                />
              )}
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
                disabled={isReadOnly}
                mode="multiple"
                placeholder="Chọn phòng ban"
                onChange={handleChangeDepartment}
                style={{
                  width: "100%",
                }}
                // options={departmentFormat}
              >
                {departmentFormat?.map(({ value, label }) => (
                  <Select.Option
                    value={value}
                    style={{
                      display: department_project?.includes(value)
                        ? "none"
                        : "",
                    }}
                    label={label}
                  >
                    {label}
                  </Select.Option>
                ))}
              </Select>
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
                disabled={isReadOnly}
                mode="multiple"
                placeholder="Chọn nhân viên"
                onChange={handleSelectWorkerProject}
                style={{
                  width: "100%",
                }}
              >
                {dataEmployeesByDe?.map(({ value, label }) => (
                  <Select.Option
                    value={value}
                    style={{
                      display: worker_project?.includes(value) ? "none" : "",
                    }}
                    label={label}
                  >
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Trạng thái"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn chức vụ !",
                  type: "string",
                },
              ]}
            >
              <Select
                disabled={isReadOnly}
                className="selection-group_form"
                style={{ width: 120 }}
                placeholder="Chức vụ"
                onChange={handleChangeStatus}
                options={[
                  { value: "false", label: "Đang thực hiện" },
                  { value: "true", label: "Hoàn thành" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Trạng thái tăng ca"
              name="statusOvertime"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trạng thái tăng ca !",
                  type: "string",
                },
              ]}
            >
              <Select
                disabled={isReadOnly}
                className="selection-group_form"
                style={{ width: 120 }}
                placeholder="Trạng thái"
                options={[
                  { value: "true", label: "Có " },
                  { value: "false", label: "Không" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Ngày bắt đầu"
            >
              {dataAPI?.data?.status === true ? (
                <input
                  disabled={isReadOnly}
                  style={{
                    width: "100%",
                    height: "38px",
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    padding: "4px 11px",
                  }}
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  value={dateStart}
                  onChange={onChangeDateStart}
                />
              ) : (
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
                  name="date_of_birth"
                  id="date_of_birth"
                  value={dateStart}
                  onChange={onChangeDateStart}
                />
              )}
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              className="username label-group_form"
              label="Ngày kết thúc"
            >
              {dataAPI?.data?.status === true ? (
                <input
                  disabled={isReadOnly}
                  style={{
                    width: "100%",
                    height: "38px",
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    padding: "4px 11px",
                  }}
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  value={dateEnd}
                  onChange={onChangeDateEnd}
                />
              ) : (
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
                  name="date_of_birth"
                  id="date_of_birth"
                  value={dateEnd}
                  onChange={onChangeDateEnd}
                />
              )}
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
              {dataAPI?.data?.status === true ? (
                <TextArea disabled={isReadOnly} rows={4} />
              ) : (
                <TextArea readOnly rows={4} />
              )}
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
              onClick={handleConfirmButton}
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
              onClick={handleComFirmError}
            >
              Cập nhật
            </div>
          )}
        </div>
      </Form>
    </LayoutPage>
  );
};

export default PageDetailProject;
