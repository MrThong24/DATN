import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import "../../../styles/general.css";

const PageProject = () => {
  const columns = [
    {
      title: "Tên dự án",
      dataIndex: "name",
    },
    {
      title: "Số lượng công nhân",
      dataIndex: "chinese",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Quản lý dự án",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Địa điểm làm việc",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Thời gian làm việc",
      dataIndex: "english",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <Link to="id" style={{ color: "#0022ff", fontWeight: "600" }}>
          Chi tiết
        </Link>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <LayoutPage title="Công việc">
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={false}
      />
    </LayoutPage>
  );
};

export default PageProject;
