import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "@themesberg/react-bootstrap";

const Overtime = () => {
  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "name",
    },
    {
      title: "Tên dự án",
      dataIndex: "name_profile",
      sorter: {
        compare: (a, b) => a.name_profile - b.name_profile,
        multiple: 3,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 2,
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "archive",
      render: (archive) => (
        <span
          style={{
            color: archive === "Duyệt" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {archive}
        </span>
      ),
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
              backgroundColor: "rgb(18 34 139 / 92%)",
              padding: "5px 18px",
              marginRight: "10px",
            }}
            onClick={showModal}
          >
            Chi tiết
          </Link>
          <Link
            style={{
              color: "white",
              fontWeight: "600",
              borderRadius: "6px",
              backgroundColor: "#e00101",
              padding: "5px 18px",
            }}
            // onClick={showModalDelete}
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
      name: "John Brown",
      phone: "0254848653",
      name_profile: "Xây cầu cống",
      archive: "Duyệt",
    },
    {
      key: "2",
      name: "Jim Green",
      phone: "0534848653",
      name_profile: "Thi công công trình Hà Nội",
      archive: "Chưa duyệt",
    },
    {
      key: "3",
      name: "Joe Black",
      phone: "0231423242",
      name_profile: "Xây cầu cống",
      archive: "Chưa duyệt",
    },
    {
      key: "4",
      name: "Jim Red",
      phone: "032414235",
      name_profile: "Thi công công trình Hà Nội",
      archive: "Duyệt",
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
    <>
      <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
        <Card.Body>
          <h5 className="mb-4">Duyệt tăng ca</h5>
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
            footer={null}
            width={900}
          >
            <h5 style={{ marginBottom: "40px" }}>Duyệt tăng ca</h5>
            <Row style={{ marginBottom: "20px" }}>
              <Col md={4}>
                <h6 style={{ fontWeight: 700 }}>
                  Tên nhân viên :{" "}
                  <span style={{ fontWeight: 500 }}>Bùi Chí Thông</span>
                </h6>
              </Col>
              <Col md={4}>
                <h6 style={{ fontWeight: 700 }}>
                  Ngày đăng ký tăng ca :{" "}
                  <span style={{ fontWeight: 500 }}>2023-03-29</span>
                </h6>
              </Col>
              <Col md={4}>
                <h6 style={{ fontWeight: 700 }}>
                  Số điện thoại :{" "}
                  <span style={{ fontWeight: 500 }}>0795590868</span>
                </h6>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col md={12}>
                <h6 style={{ fontWeight: 700 }}>
                  Tên dự án :{" "}
                  <span style={{ fontWeight: 500 }}>
                    Thi công công trình Đại học
                  </span>
                </h6>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col md={4}>
                <h6 style={{ fontWeight: 700 }}>
                  Thời gian bắt đầu :{" "}
                  <span style={{ fontWeight: 500 }}>2023-04-05</span>
                </h6>
              </Col>
              <Col md={4}>
                <h6 style={{ fontWeight: 700 }}>
                  Thời gian kết thúc :{" "}
                  <span style={{ fontWeight: 500 }}>2023-04-06</span>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h6>Nội dung tăng ca :</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur hic totam cumque alias. Itaque laborum commodi
                  corporis deserunt, voluptas sed repudiandae. Repudiandae,
                  voluptas? Cupiditate architecto quibusdam unde perferendis eum
                  perspiciatis.
                </p>
              </Col>
            </Row>
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
                style={{
                  padding: "0px 20px",
                  backgroundColor: "#262b40",
                  height: "38px",
                  fontSize: "16px",
                }}
              >
                Duyệt
              </Button>
            </div>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default Overtime;
