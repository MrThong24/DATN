import apiDepartment from "../../../api/apiDepartment";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

const PageDepartmentUpdate = ({ idUpdate, onClose }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [dataAPI, setDataAPI] = useState(null);
  useEffect(() => {
    async function fetchData(idUpdate) {
      const data = await apiDepartment.getDepartmentId(idUpdate);
      console.log(data);
      form.setFieldsValue({ code: data.code, name: data.name });
    }
    if (idUpdate) {
      fetchData(idUpdate);
    }
  }, [idUpdate]);
  console.log(dataAPI);
  const onFinish = async (values) => {
    await apiDepartment.editDepartmentById(idUpdate, values).then((data) => {
      console.log(data);
      onClose();
    });
  };

  return (
    <>
      <h5 className="mb-4">Tạo mới phòng ban</h5>
      <Form
        form={form}
        layout="vertical"
        className="row-col"
        onFinish={onFinish}
      >
        <Row>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Mã phòng ban"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tên phòng ban",
                  type: "string",
                },
              ]}
            >
              <Input
                placeholder="Tên phòng ban"
                className="inputUser input-group_form"
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item
              className="username label-group_form"
              label="Tên phòng ban"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã phòng ban",
                  type: "string",
                },
              ]}
            >
              <Input
                placeholder="Tên phòng ban"
                className="inputUser input-group_form"
              />
            </Form.Item>
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
                htmlType="submit"
                style={{
                  padding: "0px 20px",
                  backgroundColor: "#262b40",
                  height: "38px",
                  fontSize: "16px",
                }}
              >
                Chỉnh sửa
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PageDepartmentUpdate;
