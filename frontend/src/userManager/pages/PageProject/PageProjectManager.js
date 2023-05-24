import apiProduct from "../../../api/apiProduct";
import { Card } from "@themesberg/react-bootstrap";
import { Button, Modal, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import moment from "moment-timezone";
import Search from "antd/es/transfer/search";
import PageProjectManagerNew from "./PageProjectManagerNew";

const PageProjectManager = () => {
  const [dataAPI, setDataAPI] = useState(null);

  const [userId, setUserId] = useState([]);

  /* START get userInfo data from localStorage */
  useEffect(() => {
    const id =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    setUserId(JSON.parse(id));
  }, []);
  /* END get userInfo data from localStorage */

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
      title: "Tăng ca",
      dataIndex: "statusOvertime",
      filters: [
        {
          text: "Có",
          value: true,
        },
        {
          text: "Không ",
          value: false,
        },
      ],
      onFilter: (value, record) => record.statusOvertime === value,
      render: (_, { statusOvertime }) => {
        let color = statusOvertime === true ? "green" : "volcano";
        return (
          <Tag color={color} key={statusOvertime}>
            {statusOvertime === true ? "Có" : "Không"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
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

  const handleSaveClose = () => {
    apiProduct.getAllProject().then((res) => {
      setDataAPI(res);
    });
    setIsModalOpen(false);
  };

  const showModalDetails = (id) => () => {
    navigate(`/manager/project/${id}`);
    console.log(id);
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
  const data = useMemo(() => {
    if (dataAPI?.data) {
      return dataAPI?.data
        ?.filter(
          (item) =>
            item.status === true &&
            item.manager_project.some((manager) => manager._id === userId._id)
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
  }, [dataAPI]);
  /* END event call api to pass table  */

  const onChange = (pagination, filters, sorter, extra) => {};

  /* START event search */
  const [valueSearch, setValueSearch] = useState("");

  const dataOnSearch = useMemo(() => {
    if (data) {
      return data?.filter((item) =>
        item?.name_project?.toLowerCase()?.includes(valueSearch?.toLowerCase())
      );
    }
    return [];
  }, [data, valueSearch]);
  const onSearch = (e) => {
    setValueSearch(e?.target?.value);
  };
  /* END event search */
  return (
    <LayoutPage title="Công việc">
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
        columns={columns}
        dataSource={dataOnSearch}
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
        <PageProjectManagerNew
          onClose={handleSaveClose}
        ></PageProjectManagerNew>
      </Modal>
    </LayoutPage>
  );
};

export default PageProjectManager;
