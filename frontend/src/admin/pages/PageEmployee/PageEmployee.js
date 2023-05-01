import React, { useState } from "react";
import { Card } from "@themesberg/react-bootstrap";
import { Button, Table, Modal } from "antd";
import { Link } from "react-router-dom";
import PageDetailEmployee from "./PageDetailEmployee";
import "../../../styles/general.css";
import PageNewEmployee from "./PageNewEmployee";

const PageEmployee = () => {
  const columns = [
    {
      title: "Tên công nhân",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 3,
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      sorter: {
        compare: (a, b) => a.gender - b.gender,
        multiple: 2,
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "archive",
      render: (archive) => (
        <span
          style={{
            color: archive === "Đang hoạt động" ? "green" : "red",
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
            to="id"
            style={{
              color: "white",
              fontWeight: "600",
              borderRadius: "6px",
              backgroundColor: "rgb(18 34 139 / 92%)",
              padding: "5px 18px",
              marginRight: "10px",
            }}
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
            onClick={showModalDelete}
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
      gender: "Nữ",
      archive: "Đang hoạt động",
    },
    {
      key: "2",
      name: "Jim Green",
      phone: "0534848653",
      gender: "Nam",
      archive: "Đang hoạt động",
    },
    {
      key: "3",
      name: "Joe Black",
      phone: "0231423242",
      gender: "Nữ",
      archive: "Ngưng hoạt động",
    },
    {
      key: "4",
      name: "Jim Red",
      phone: "032414235",
      gender: "Nam",
      archive: "Đang hoạt động",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
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
  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-4">Quản lý nhân viên</h5>
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
          footer={null}
          width={1200}
        >
          <PageNewEmployee></PageNewEmployee>
        </Modal>
        <Modal
          open={isModalOpenDelete}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
        >
          <p>Bạn có chắc chắn muốn xóa?</p>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PageEmployee;
