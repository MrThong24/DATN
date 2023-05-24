import apiProduct from "../../../api/apiProduct";
import { Card } from "@themesberg/react-bootstrap";
import { Button, Modal, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectNew from "./PageNewProject";
import PageNewProject from "./PageNewProject";
import Search from "antd/es/transfer/search";

const PageProject = () => {
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();

  const [dataAPI, setDataAPI] = useState(null);

  const onChange = (pagination, filters, sorter, extra) => {};
  const columns = [
    {
      title: "Tên dự án",
      dataIndex: "name_project",
      sorter: {
        compare: (a, b) => a.name_project - b.name_project,
        multiple: 3,
      },
    },
    {
      title: "Địa điểm làm việc",
      dataIndex: "place_project",
      sorter: {
        compare: (a, b) => a.place_project - b.place_project,
        multiple: 3,
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đã duyệt",
          value: true,
        },
        {
          text: "Chưa duyệt",
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
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, item) => {
        return (
          <div style={{ display: "flex" }}>
            <div
              onClick={showModalDetails(item.key)}
              style={{
                color: "white",
                fontWeight: "600",
                borderRadius: "6px",
                backgroundColor: "rgb(18 34 139 / 92%)",
                padding: "5px 18px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Chi tiết
            </div>
          </div>
        );
      },
    },
  ];
  const showModalDetails = (id) => () => {
    navigate(`/dashboard/project/${id}`);
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
  /* START event call api to pass table  */
  useEffect(() => {
    async function fetchData() {
      const data = await apiProduct.getAllProject();
      setDataAPI(data);
    }
    fetchData();
  }, []);

  const handleSaveClose = () => {
    apiProduct.getAllProject().then((res) => {
      setDataAPI(res);
    });
    setIsModalOpen(false);
  };

  const data = useMemo(() => {
    if (dataAPI?.data) {
      return dataAPI?.data?.map((item, index) => ({
        key: item._id,
        name_project: item.name_project,
        place_project: item.place_project,
        status: item.status,
      }));
    }
    return [];
  }, [dataAPI]);
  /* END event call api to pass table  */

  /* START event search */
  const dataOnSearch = useMemo(() => {
    if (data) {
      return data?.filter((item) =>
        item?.name_project?.toLowerCase()?.includes(valueSearch?.toLowerCase())
      );
    }
    return [];
  }, [data, valueSearch]);
  const onSearch = (e) => {
    setValueSearch(e.target.value);
  };
  /* END event search */
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-4">Quản lý công việc</h5>
        <div style={{ maxWidth: "420px" }} className="search">
          <Search placeholder="Tìm kiếm" onChange={onSearch} enterButton />
        </div>
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
          dataSource={dataOnSearch}
          columns={columns}
          onChange={onChange}
          showSorterTooltip={false}
          pagination={{
            pageSize: 5, // Số lượng bản ghi trên mỗi trang
          }}
        />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={1200}
        >
          <PageNewProject onClose={handleSaveClose}></PageNewProject>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PageProject;
