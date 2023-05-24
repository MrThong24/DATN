/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import { Button, Form, Input, Select, Table, Tag } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiUser from "../../../api/apiUser";
import apiDepartment from "../../../api/apiDepartment";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { Tabs } from "antd";
import apiProduct from "../../../api/apiProduct";
import apiOvertime from "../../../api/apiOvertime";
const DetailEmployee = () => {
  const [image, setImage] = useState();

  const [imageAfter, setImageAfter] = useState();

  const [imageTest, setImageTest] = useState(true);

  const [dataDepartment, setDataDepartment] = useState(null);

  const [dataApi, setDataApi] = useState(null);

  const [dataApiProject, setDataApiProject] = useState(null);

  const { id } = useParams();

  const [form] = Form.useForm();

  const [selectedPositionLabel, setSelectedPositionLabel] = useState("");

  const [selectStatus, setSelectStatus] = useState("");

  const [selectDepartment, setSelectDepartment] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");

  const [isReadOnly, setIsReadOnly] = useState(true);

  const { TabPane } = Tabs;

  const [activeTab, setActiveTab] = useState("1");

  const [dataOvertime, setDataOvertime] = useState("");

  const handleChangeStatus = (value, label) => {
    setSelectStatus(label?.label);
  };

  const handleChange = (value) => {};

  const handleChangeDepartment = (value, label) => {
    setSelectDepartment(label?.label);
  };

  const handleChangePosition = (value, label) => {
    setSelectedPositionLabel(label?.label);
  };

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

  /* START api get all overtime */
  useEffect(() => {
    async function fetchData() {
      const data = await apiOvertime.getAllOvertime();
      setDataOvertime(data);
    }
    fetchData();
  }, []);

  /*START Api get details Employee */
  useEffect(() => {
    async function fetchData(id) {
      const data = await apiUser.getUserId(id);
      form.setFieldsValue({
        _id: data._id,
        account_employee: data.account_employee,
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

  const onChangeEndDate = (e) => {
    setDateOfBirth(e.target.value);
  };

  useEffect(() => {
    setDateOfBirth(
      moment(dataApi?.data?.overtime?.date_of_birth).format("YYYY-MM-DD")
    );
  }, [dataApi]);

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
    values.position_employee = selectedPositionLabel;
    values.department_employee = selectDepartment;
    const dataForm = new FormData();
    dataForm.append("date_of_birth", dateOfBirth);
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

  const handleTestButtonClick = () => {
    setIsReadOnly(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  /*  */
  const onChange = (pagination, filters, sorter, extra) => {};

  const columns = [
    {
      title: "Tên dự án",
      dataIndex: "name_project",
      sorter: {
        compare: (a, b) => a.name_project - b.name_project,
      },
    },
    {
      title: "Địa điểm làm việc",
      dataIndex: "place_project",
      sorter: {
        compare: (a, b) => a.place_project - b.place_project,
      },
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "date_start",
      sorter: {
        compare: (a, b) => a.date_start - b.date_start,
      },
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "date_end",
      sorter: {
        compare: (a, b) => a.date_end - b.date_end,
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đang thực hiện",
          value: true,
        },
        {
          text: "Hoàn thành",
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => {
        let color = status === true ? "volcano" : "green";
        return (
          <Tag color={color} key={status}>
            {status === true ? "Đang thực hiện" : "Hoàn thành"}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (_, item) => (
        <div
          onClick={showModalDetails(item.key)}
          style={{ color: "#0022ff", fontWeight: "600", cursor: "pointer" }}
        >
          Chi tiết
        </div>
      ),
    },
  ];
  const navigate = useNavigate();

  const showModalDetails = (id) => () => {
    navigate(`/dashboard/employee/${id}/${id}`);
    console.log(id);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await apiProduct.getAllProject();
      setDataApiProject(data);
    }
    fetchData();
  }, []);

  const data = useMemo(() => {
    if (dataApiProject?.data) {
      return dataApiProject?.data
        ?.filter(
          (item) =>
            (item.status === true &&
              item.worker_project.some((manager) => manager._id === id)) ||
            item.manager_project.some((manager) => manager._id === id)
        )
        .map((item, index) => ({
          key: item._id,
          name_project: item.name_project,
          place_project: item.place_project,
          status: item.status,
          statusOvertime: item.statusOvertime,
          date_start: moment(item.date_start).format("DD-MM-YYYY"),
          date_end: moment(item.date_end).format("DD-MM-YYYY"),
        }));
    }
    return [];
  }, [dataApiProject]);

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
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab={<span>Thông tin chung</span>} key="1">
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
                            message:
                              "Vui lòng nhập thông tin liện hệ khẩn cấp !",
                            type: "string",
                          },
                        ]}
                      >
                        <Select
                          disabled={isReadOnly}
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
                    <Col md={6}>
                      <Form.Item
                        className="username label-group_form"
                        label="Mật khẩu"
                        name="password_employee"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                            type: "string",
                          },
                        ]}
                      >
                        <Input
                          readOnly={isReadOnly}
                          placeholder="Mật khẩu mới"
                          className="inputUser input-group_form"
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
                          readOnly={isReadOnly}
                          placeholder="Tên tài khoản"
                          className="inputUser input-group_form"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        className="username label-group_form"
                        label="Mã nhân viên"
                        name="account_employee"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mã nhân viên!",
                            type: "string",
                          },
                        ]}
                      >
                        <Input
                          readOnly={isReadOnly}
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
                          readOnly={isReadOnly}
                          placeholder="Tên nhân viên"
                          className="inputUser input-group_form"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        className="username label-group_form"
                        label="Ngày sinh"
                        rules={[
                          {
                            message: "Vui lòng nhập ngày sinh",
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
                          name="date_of_birth"
                          id="date_of_birth"
                          value={dateOfBirth}
                          onChange={onChangeEndDate}
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
                          disabled={isReadOnly}
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
                          disabled={isReadOnly}
                          className="selection-group_form"
                          style={{ width: 120 }}
                          onChange={handleChangePosition}
                          placeholder="Chức vụ"
                          options={[
                            { value: "position1", label: "Công nhân xây dựng" },
                            {
                              value: "position2",
                              label: "Trưởng nhóm xây dựng",
                            },
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
                          disabled={isReadOnly}
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
                          readOnly={isReadOnly}
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
                          readOnly={isReadOnly}
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
                          readOnly={isReadOnly}
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
                            message: "Vui lòng chỉ nhập số!",
                            type: "number",
                          },
                        ]}
                      >
                        <Input
                          readOnly={isReadOnly}
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
                        // rules={[
                        //   {
                        //     required: true,
                        //     message:
                        //       "Vui lòng nhập số điện thoại và nhập đủ 10 số!",
                        //     pattern: /^[0-9]{10}$/,
                        //     type: "string",
                        //   },
                        // ]}
                      >
                        <Input
                          readOnly={isReadOnly}
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
                      onClick={handleTestButtonClick}
                    >
                      Cập nhật
                    </div>
                  )}
                </div>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab={<span>Thông tin công việc</span>} key="2">
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              showSorterTooltip={false}
              pagination={{
                pageSize: 5, // Số lượng bản ghi trên mỗi trang
              }}
            />
          </TabPane>
          <TabPane tab={<span>Thống kê</span>} key="3">
            <Row>
              <Col md={4}>
                <h6>
                  Tổng số công việc : <span>{data?.length}</span>
                </h6>
              </Col>
              <Col md={4}>
                <h6>
                  Tổng số tăng ca :{" "}
                  <span>
                    {
                      dataOvertime?.data?.overtimes?.filter(
                        (item) =>
                          item.isActive === true &&
                          item?.name_employee?._id === id
                      )?.length
                    }
                  </span>
                </h6>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default DetailEmployee;
