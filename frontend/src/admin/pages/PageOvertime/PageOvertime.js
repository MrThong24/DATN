import { Button, Form, Modal, Table, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { Card, Col, Row } from "@themesberg/react-bootstrap";
import apiOvertime from "../../../api/apiOvertime";
import moment from "moment-timezone";

import PageOvertimeUpdate from "./PageOvertimeUpdate";
import Search from "antd/es/transfer/search";

const Overtime = () => {
  const [dataAPI, setDataAPI] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [idUpdate, setIdUpdate] = useState("");

  const [valueSearch, setValueSearch] = useState("");

  /* START columns table */
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
      title: "Mã nhân viên",
      dataIndex: "account_employee",
      sorter: {
        compare: (a, b) => a.account_employee - b.account_employee,
        multiple: 3,
      },
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name_employee",
      sorter: {
        compare: (a, b) => a.name_employee - b.name_employee,
        multiple: 3,
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "date_start",
      sorter: {
        compare: (a, b) => a.date_start - b.date_start,
        multiple: 3,
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "date_end",
      sorter: {
        compare: (a, b) => a.date_end - b.date_end,
        multiple: 2,
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
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
      onFilter: (value, record) => record.isActive === value,
      render: (_, { isActive }) => {
        let color = isActive === true ? "green" : "volcano";
        return (
          <Tag color={color} key={isActive}>
            {isActive === true ? "Đã duyệt" : "Chưa duyệt"}
          </Tag>
        );
      },
      defaultFilteredValue: ["false"],
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
  /* END columns table */

  console.log(dataAPI);

  /* START event show model */
  const showModalDetails = (id) => () => {
    setIsModalOpen(true);
    setIdUpdate(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  /* END event show model */

  /* START event handle close when save */
  const handleSaveClose = () => {
    apiOvertime.getAllOvertime().then((res) => {
      setDataAPI(res);
    });
    setIsModalOpen(false);
  };
  /* END event handle close when save */

  /* START event call api to pass table  */
  useEffect(() => {
    async function fetchData() {
      const data = await apiOvertime.getAllOvertime();
      setDataAPI(data);
    }
    fetchData();
  }, []);
  const data = useMemo(() => {
    if (dataAPI) {
      return dataAPI?.data?.overtimes?.map((item, index) => ({
        key: item._id,
        name_employee: item?.name_employee?.name_employee,
        name_project: item?.name_project?.name_project,

        registration_date: moment(item.registration_date).format("DD/MM/YYYY"),
        date_start: moment(item.date_start).format("DD/MM/YYYY"),
        date_end: moment(item.date_end).format("DD/MM/YYYY"),
        isActive: item.isActive,
        account_employee: item?.name_employee?.account_employee,
      }));
    }
    return [];
  }, [dataAPI]);
  /* END event call api to pass table  */

  /* START event search */
  const dataOnSearch = useMemo(() => {
    if (data) {
      return data?.filter((item) =>
        item?.name_employee?.toLowerCase()?.includes(valueSearch?.toLowerCase())
      );
    }
    return [];
  }, [data, valueSearch]);
  const onSearch = (e) => {
    setValueSearch(e?.target?.value);
  };
  /* END event search */
  return (
    <>
      <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
        <Card.Body>
          <h5 className="mb-4">Duyệt tăng ca</h5>
          <div
            style={{ maxWidth: "420px", marginBottom: "58px" }}
            className="search"
          >
            <Search placeholder="Tìm kiếm" onChange={onSearch} enterButton />
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
            width={900}
          >
            <PageOvertimeUpdate
              onClose={handleSaveClose}
              idUpdate={idUpdate}
            ></PageOvertimeUpdate>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default Overtime;
