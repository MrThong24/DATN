import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@themesberg/react-bootstrap";
import { Button, Table, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageNewEmployee from "./PageNewEmployee";
import apiUser from "../../../api/apiUser";
import "../../../styles/general.css";

const PageEmployee = () => {
  const navigate = useNavigate();

  const [dataAPI, setDataAPI] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isId, setIsId] = useState(null);
  const onChange = (pagination, filters, sorter, extra) => {};

  /* START event notify */
  const notifySuccess = () => {
    toast.success(" Xóa nhân viên thành công!", {
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
  const notifyError = () => {
    toast.error(" Xóa nhân viên thất bại!", {
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
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "account_employee",
      sorter: {
        compare: (a, b) => a.account_employee - b.account_employee,
        multiple: 3,
      },
    },
    {
      title: "Tên công nhân",
      dataIndex: "name_employee",
      sorter: {
        compare: (a, b) => a.name_employee - b.name_employee,
        multiple: 3,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_employee",
      sorter: {
        compare: (a, b) => a.phone_employee - b.phone_employee,
        multiple: 3,
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender_employee",
      sorter: {
        compare: (a, b) => a.gender_employee - b.gender_employee,
        multiple: 2,
      },
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
          value: "2",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <span
          style={{
            color: status === "Đang hoạt động" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {status === "Đang hoạt động" ? "Đang hoạt động" : "Ngưng hoạt động"}
        </span>
      ),
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
            <Link
              style={{
                color: "white",
                fontWeight: "600",
                borderRadius: "6px",
                backgroundColor: "#e00101",
                padding: "5px 18px",
              }}
              onClick={handleDeleteUser(item.key)}
            >
              Xóa
            </Link>
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

  /* START event show and close delete detail Employee */
  const handleOkDelete = () => {
    try {
      apiUser.deleteUser(isId).then(() => {
        apiUser.getAllUser().then((res) => {
          notifySuccess();
          setDataAPI(res);
          setIsModalOpenDelete(false);
        });
      });
    } catch (error) {
      notifyError();
    }
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteUser = (id) => () => {
    setIsModalOpenDelete(true);
    setIsId(id);
  };
  /* END event show and close delete detail Employee */

  /* STAR event close when create employee success */
  const handleSaveClose = () => {
    apiUser.getAllUser().then((res) => {
      setDataAPI(res);
    });
    setIsModalOpen(false);
  };
  /* END event close when create employee success */

  /* START event call api all employee */
  useEffect(() => {
    async function fetchData() {
      const data = await apiUser.getAllUser();
      setDataAPI(data);
    }
    fetchData();
  }, []);
  /* END event call api all employee */

  /* START event call api to pass table  */
  const data = useMemo(() => {
    if (dataAPI?.data) {
      return dataAPI?.data?.map((item, index) => ({
        key: item._id,
        account_employee: item.account_employee,
        name_employee: item.name_employee,
        phone_employee: item.phone_employee,
        gender_employee: item.gender_employee,
        status: item.status,
      }));
    }
    return [];
  }, [dataAPI]);
  /* END event call api to pass table  */

  console.log(isId);
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
          <PageNewEmployee onClose={handleSaveClose}></PageNewEmployee>
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
