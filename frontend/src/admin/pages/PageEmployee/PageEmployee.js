import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@themesberg/react-bootstrap";
import Search from "antd/es/transfer/search";
import { Button, Table, Modal, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import PageNewEmployee from "./PageNewEmployee";
import apiUser from "../../../api/apiUser";
import "../../../styles/general.css";

const PageEmployee = () => {
  const navigate = useNavigate();

  const [valueSearch, setValueSearch] = useState("");

  const [dataAPI, setDataAPI] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* START columns table */
  const onChange = (pagination, filters, sorter, extra) => {};
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "account_employee",
      sorter: {
        compare: (a, b) => a.account_employee.localeCompare(b.account_employee),
      },
    },
    {
      title: "Tên công nhân",
      dataIndex: "name_employee",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_employee",
    },
    {
      title: "Chức vụ",
      dataIndex: "position_employee",
      filters: [
        {
          text: "Trưởng nhóm xây dựng",
          value: "Trưởng nhóm xây dựng",
        },
        {
          text: "Công nhân xây dựng",
          value: "Công nhân xây dựng",
        },
      ],
      onFilter: (value, record) => record.position_employee === value,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đang hoạt động",
          value: "Đang hoạt động",
        },
        {
          text: "Ngưng hoạt động",
          value: "Ngưng hoạt động",
        },
      ],
      onFilter: (value, record) => record.status === value,

      render: (_, { status }) => {
        let color = status === "Đang hoạt động" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status === "Đang hoạt động" ? "Đang hoạt động" : "Ngưng hoạt động"}
          </Tag>
        );
      },
      defaultFilteredValue: ["Đang hoạt động"],
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

  /* START event show model Open detail Employee */
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalDetails = (id) => () => {
    navigate(`/dashboard/employee/${id}`);
  };
  /* END event show and close model detail Employee */

  /* STAR event close when create employee success */
  const handleSaveClose = () => {
    apiUser.getAllUser().then((res) => {
      setDataAPI(res);
    });
    setIsModalOpen(false);
  };
  /* END event close when create employee success */

  /* START event call api to pass table  */
  useEffect(() => {
    async function fetchData() {
      const data = await apiUser.getAllUser();
      setDataAPI(data);
    }
    fetchData();
  }, []);
  const data = useMemo(() => {
    if (dataAPI?.data) {
      return dataAPI?.data?.map((item, index) => ({
        key: item._id,
        account_employee: item.account_employee,
        name_employee: item.name_employee,
        phone_employee: item.phone_employee,
        gender_employee: item.gender_employee,
        position_employee: item.position_employee,
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
        item?.account_employee
          ?.toLowerCase()
          ?.includes(valueSearch?.toLowerCase())
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
        <h5 className="mb-4">Quản lý nhân viên</h5>
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
          <PageNewEmployee onClose={handleSaveClose}></PageNewEmployee>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default PageEmployee;
