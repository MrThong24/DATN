import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/general.css";

const PageDepartment = () => {
  const columns = [
    {
      title: "Mã phòng ban",
      dataIndex: "code_department",
    },
    {
      title: "Tên phòng ban",
      dataIndex: "name_department",
      sorter: {
        compare: (a, b) => a.name_department - b.name_department,
        multiple: 3,
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Link
            style={{
              color: "white",
              fontWeight: "600",
              borderRadius: "6px",
              backgroundColor: "#e00101",
              padding: "5px 18px",
            }}
          >
            Xóa
          </Link>
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      code_department: "PB01",
      name_department: "Xây dựng",
    },
    {
      key: "2",
      code_department: "PB02",
      name_department: "Điện",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
        />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <h5 className="mb-4">Tạo mới phòng ban</h5>
          <Form layout="vertical" className="row-col">
            <Row>
              <Col md={6}>
                <Form.Item
                  className="username label-group_form"
                  label="Mã phòng ban"
                  code_department="name_department"
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
                  label="Mã phòng ban"
                  code_department="code_department"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã phòng ban",
                      type: "string",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mã phòng ban"
                    className="inputUser input-group_form"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PageDepartment;
