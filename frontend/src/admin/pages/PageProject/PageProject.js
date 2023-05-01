import { Card } from "@themesberg/react-bootstrap";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectNew from "./PageNewProject";

const PageProject = () => {
  const columns = [
    {
      title: "Tên dự án",
      dataIndex: "name_project",
    },
    {
      title: "Quản lý dự án",
      dataIndex: "manager_project",
      sorter: {
        compare: (a, b) => a.manager_project - b.manager_project,
        multiple: 3,
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "archive",
      render: (archive) => (
        <span
          style={{
            color: archive === "Đang thực hiện" ? "green" : "red",
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
      name_project: "Dự án thi công ở Đại Học sư phạm",
      manager_project: "Bùi Chí Thông",
      archive: "Đang thực hiện",
    },
    {
      key: "2",
      name_project: "Dự án thi công ở Đại Học sư phạm",
      manager_project: "Bùi Chí Thông",
      archive: "Đang thực hiện",
    },
    {
      key: "3",
      name_project: "Dự án thi công ở Đại Học sư phạm",
      manager_project: "Bùi Chí Thông",
      archive: "Đã hoàn thành",
    },
    {
      key: "4",
      name_project: "Dự án thi công ở Đại Học sư phạm",
      manager_project: "Bùi Chí Thông",
      archive: "Đã hoàn thành",
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
        <h5 className="mb-4">Quản lý công việc</h5>
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
          width={900}
        >
          <ProjectNew></ProjectNew>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PageProject;
