import LayoutPage from "../../layout/LayoutPage";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import "../../../styles/general.css";
import apiOvertime from "../../../api/apiOvertime";
import { useNavigate } from "react-router";
import moment from "moment-timezone";
import PageOvertimeManagerNew from "./PageOvertimeManagerNew";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Search from "antd/es/transfer/search";

const PageOvertimeManager = () => {
  const [dataAPI, setDataAPI] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalDelete, setIsModalDelete] = useState(false);

  const [isId, setIsId] = useState(null);

  const [valueSearch, setValueSearch] = useState("");

  const [userId, setUserId] = useState([]);

  const navigate = useNavigate();

  /* START event notify */
  const notifySuccess = () => {
    toast.success(" Xóa tăng ca thành công !", {
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
  /* END event notify */

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
          text: "Chờ duyệt",
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
            {!item.isActive && (
              <Link
                style={{
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "6px",
                  backgroundColor: "#e00101",
                  padding: "5px 18px",
                }}
                onClick={() => handleDeleteOvertime(item.key)}
              >
                Xóa
              </Link>
            )}
          </div>
        );
      },
    },
  ];
  /* END columns table */

  /* START event show model details */
  const showModalDetails = (id) => () => {
    navigate(`/manager/overtime/${id}`);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  /* END event show model details */

  /* START event delete overtime and show model delete */
  const handleDeleteOvertime = (id) => {
    setIsModalDelete(true);
    setIsId(id);
  };
  const handleOkDelete = async () => {
    try {
      await apiOvertime.deleteOvertimeId(isId);
      setIsModalDelete(false);
      const newData = await apiOvertime.getAllOvertime();
      setDataAPI(newData);
      notifySuccess();
    } catch (error) {}
  };
  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };
  /* END event delete overtime and show model delete */

  /* START get userInfo data from localStorage */
  useEffect(() => {
    const id =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    setUserId(JSON.parse(id));
  }, []);
  /* END get userInfo data from localStorage */

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
  const filteredOvertimes = dataAPI?.data?.overtimes.filter(
    (overtime) => overtime?.name_employee?._id === userId._id
  );
  const data = useMemo(() => {
    if (filteredOvertimes) {
      return filteredOvertimes?.map((item, index) => ({
        key: item._id,
        name_project: item?.name_project?.name_project,
        date_start: moment(item.date_start).format("DD/MM/YYYY"),
        date_end: moment(item.date_end).format("DD/MM/YYYY"),
        isActive: item.isActive,
      }));
    }
    return [];
  }, [filteredOvertimes]);
  /* START event call api to pass table  */

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
    setValueSearch(e?.target?.value);
  };
  /* END event search */

  return (
    <LayoutPage title="Đăng ký tăng ca">
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
        <PageOvertimeManagerNew
          onClose={handleSaveClose}
        ></PageOvertimeManagerNew>
      </Modal>
      <Modal
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        open={isModalDelete}
      >
        Bạn có muốn xóa ?
      </Modal>
    </LayoutPage>
  );
};

export default PageOvertimeManager;
