/* eslint-disable react-hooks/exhaustive-deps */
import apiDepartment from "../../../api/apiDepartment";
import { Col, Row } from "@themesberg/react-bootstrap";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

const PageDepartmentUpdate = ({ idUpdate, onClose }) => {
  const [form] = Form.useForm();

  /* START event call api detail department */
  useEffect(() => {
    async function fetchData(idUpdate) {
      const data = await apiDepartment.getDepartmentId(idUpdate);
      form.setFieldsValue({ code: data.code, name: data.name });
    }
    if (idUpdate) {
      fetchData(idUpdate);
    }
  }, [idUpdate]);
  /* START event call api detail department */

  /* START event call api update department */
  const onFinish = async (values) => {
    await apiDepartment.editDepartmentById(idUpdate, values).then((data) => {
      onClose();
    });
  };
  /* END event call api update department */

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
