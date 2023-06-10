/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Avatar, List } from "antd";
import apiProduct from "../../../api/apiProduct";
import moment from "moment-timezone";

const PageDetailEmployeeProject = () => {
  const [dataApi, setDataApi] = useState(null);

  const { id } = useParams();

  /*START Api get details Employee */
  useEffect(() => {
    async function fetchData(id) {
      const data = await apiProduct.getProjectId(id);
      setDataApi(data);
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);
  /*END Api get details Employee */

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-5">
          <Link style={{ cursor: "pointer", marginRight: "6px" }} to="/project">
            Công việc
          </Link>
          / Chi tiết công việc
        </h5>
        <Row className="mb-4">
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Tên dự án :{" "}
              <span style={{ fontWeight: 500 }}>
                {dataApi?.data?.name_project}
              </span>
            </h6>
          </Col>
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Địa chỉ công việc :{" "}
              <span style={{ fontWeight: 500 }}>
                {dataApi?.data?.place_project}
              </span>
            </h6>
          </Col>
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Trạng thái :{" "}
              <span style={{ fontWeight: 600 }}>
                {dataApi?.data?.status === false
                  ? "Đang thực hiện"
                  : "Hoàn thành"}
              </span>
            </h6>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Thời gian bắt đầu :{" "}
              <span style={{ fontWeight: 500 }}>
                {moment(dataApi?.data?.date_start).format("DD-MM-YYYY")}
              </span>
            </h6>
          </Col>
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Thời gian kết thúc :{" "}
              <span style={{ fontWeight: 500 }}>
                {moment(dataApi?.data?.date_end).format("DD-MM-YYYY")}
              </span>
            </h6>
          </Col>
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Tăng ca:{" "}
              <span style={{ fontWeight: 600 }}>
                {dataApi?.data?.statusOvertime === false ? "Không" : "Có"}
              </span>
            </h6>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <h6>Danh sách các quản lý nhóm xây dựng</h6>
            <List
              itemLayout="horizontal"
              dataSource={dataApi?.data?.manager_project}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`http://localhost:5000/${item?.image}`} />
                    }
                    title={<h8>{item.name_employee}</h8>}
                    description={item.department_employee}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col md={6}>
            <h6>Danh sách các công nhân xây dựng</h6>
            <List
              itemLayout="horizontal"
              dataSource={dataApi?.data?.worker_project}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`http://localhost:5000/${item?.image}`} />
                    }
                    title={<h8>{item.name_employee}</h8>}
                    description={item.department_employee}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={8}>
            <h6>Chi tiết công việc</h6>
            <p>{dataApi?.data?.reason_project}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default PageDetailEmployeeProject;
