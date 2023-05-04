/* eslint-disable react-hooks/exhaustive-deps */
import apiDepartment from "../../../api/apiDepartment";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/general.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import PageDepartmentUpdate from "./PageDepartmentUpdate";

const PageDepartment = () => {
  const [dataAPI, setDataAPI] = useState(null);

  const notifySuccessUpdate = () => {
    toast.success("Chỉnh sửa phòng bang thành công!", {
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

  const notifySuccess = () => {
    toast.success(" Tạo mới phòng bang thành công!", {
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

  const notifyDeleteSuccess = () => {
    toast.success(" Xóa phòng bang thành công!", {
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
    toast.error(" Tạo mới phòng bang thất bại!", {
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

  useEffect(() => {
    async function fetchData() {
      const data = await apiDepartment.getAllDepartment();
      setDataAPI(data);
    }
    fetchData();
  }, []);

  const data = useMemo(() => {
    if (dataAPI?.data) {
      return dataAPI?.data?.map((item, index) => ({
        key: item._id,
        code_department: item.code,
        name_department: item.name,
      }));
    }
    return [];
  }, [dataAPI]);

  const columns = [
    {
      title: "Mã phòng ban",
      dataIndex: "code_department",
      sorter: {
        compare: (a, b) => a.name_department.localeCompare(b.name_department),
      },
    },
    {
      title: "Tên phòng ban",
      dataIndex: "name_department",
      sorter: {
        compare: (a, b) => a.name_department.localeCompare(b.name_department),
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, item) => {
        return (
          <>
            <Link
              onClick={handleDeleteDepartment(item.key)}
              style={{
                color: "white",
                fontWeight: "600",
                borderRadius: "6px",
                backgroundColor: "#e00101",
                padding: "5px 18px",
                marginRight: "10px",
              }}
            >
              Xóa
            </Link>
            <Link
              onClick={showModalUpdate(item.key)}
              style={{
                color: "white",
                fontWeight: "600",
                borderRadius: "6px",
                backgroundColor: "rgb(18 34 139 / 92%)",
                padding: "5px 18px",
              }}
            >
              Chi tiết
            </Link>
          </>
        );
      },
    },
  ];

  const handleDeleteDepartment = (id) => () => {
    try {
      apiDepartment.deleteDepartmentId(id).then(() => {
        notifyDeleteSuccess();
        apiDepartment.getAllDepartment().then((res) => {
          setDataAPI(res);
        });
      });
    } catch (error) {}
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalUpdate = (id) => () => {
    setIsModalOpenUpdate(true);
    setIdUpdate(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenUpdate(false);
    setIdUpdate("");
  };
  const handleSaveClose = () => {
    setIsModalOpen(false);
    setIsModalOpenUpdate(false);
    setIdUpdate("");
    notifySuccessUpdate();

    apiDepartment.getAllDepartment().then((res) => {
      setDataAPI(res);
    });
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const data = await apiDepartment.addDepartment(values);
      setIsModalOpen(false);
      apiDepartment.getAllDepartment().then((res) => {
        setDataAPI(res);
        notifySuccess();
      });
      form.resetFields();
    } catch (error) {
      notifyError();
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-4">Phòng ban</h5>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginBottom: "20px",
          }}
        >
          <Button
            type="primary"
            className="signInBtn"
            onClick={showModal}
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
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          showSorterTooltip={false}
          pagination={{
            pageSize: 5, // Số lượng bản ghi trên mỗi trang
          }}
        />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          footer={null}
          onCancel={handleCancel}
          width={800}
        >
          <h5 className="mb-4">Tạo mới phòng ban</h5>
          <Form
            form={form}
            layout="vertical"
            className="row-col"
            onFinish={onFinish}
          >
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Mã phòng ban"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng tên phòng ban",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên phòng ban"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Tên phòng ban"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã phòng ban",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên phòng ban"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    marginBottom: "20px",
                    gap: 20,
                  }}
                >
                  <Button
                    type="primary"
                    className="signInBtn"
                    onClick={showModal}
                    htmlType="submit"
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
              </Col>
            </Row>
          </Form>
        </Modal>
        {isModalOpenUpdate && (
          <Modal
            open={isModalOpenUpdate}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
            width={800}
          >
            <PageDepartmentUpdate
              idUpdate={idUpdate}
              onClose={handleSaveClose}
            ></PageDepartmentUpdate>
          </Modal>
        )}
      </Card.Body>
    </Card>
  );
};

export default PageDepartment;
