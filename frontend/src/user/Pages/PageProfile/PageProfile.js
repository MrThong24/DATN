import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "antd";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Field from "../../components/Field/Field";
import LayoutPage from "../../layout/LayoutPage";
import apiUser from "../../../api/apiUser";
import moment from "moment-timezone";
import "../../../styles/general.css";

const PageProfile = () => {
  const [dataApi, setDataApi] = useState(null);

  const [userId, setUserId] = useState([]);

  /* START get userInfo data from localStorage */
  useEffect(() => {
    const id =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    setUserId(JSON.parse(id));
  }, []);
  /* END get userInfo data from localStorage */

  /* START get data userId */
  useEffect(() => {
    async function fetchData() {
      const data = await apiUser.getUserId(userId?._id);
      setDataApi(data);
    }
    if (userId?._id) {
      fetchData(userId?._id);
    }
  }, [userId?._id]);
  /* START get data userId */

  return (
    <LayoutPage title="Thông tin cá nhân">
      <Form className="row-col">
        <Row>
          <Col xs={12} xl={8}>
            <Row style={{ marginBottom: "30px" }}>
              <Field
                title="Tên nhân viên"
                name={dataApi?.name_employee}
              ></Field>
              <Field
                title="Tên tài khoản"
                name={dataApi?.account_employee}
              ></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field
                title="Tên phòng ban"
                name={dataApi?.department_employee}
              ></Field>
              <Field title="Chức vụ" name={dataApi?.position_employee}></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="Quê quán" name={dataApi?.address_employee}></Field>
              <Field title="Giới tính" name={dataApi?.gender_employee}></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="CMND/CCCD" name={dataApi?.cmnd_employee}></Field>
              <Field
                title="Số điện thoại"
                name={dataApi?.phone_employee}
              ></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field
                title="Nơi ở hiện tại"
                name={dataApi?.current_residence}
              ></Field>
              <Field
                title="Ngày sinh"
                name={
                  dataApi
                    ? moment(dataApi.date_of_birth).format("DD/MM/YYYY")
                    : null
                }
              ></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field
                title="Lương"
                name={`${dataApi?.wage_employee} VNĐ`}
              ></Field>
            </Row>
          </Col>
          <Col xs={12} xl={4}>
            <Row>
              <Col xs={12}>
                <Card border="light" className="text-center p-0 mb-4">
                  <div
                    style={{ backgroundImage: `url(${ProfileCover})` }}
                    className="profile-cover rounded-top"
                  />
                  <Card.Body className="pb-5">
                    <Card.Img
                      src={`http://localhost:5000/${dataApi?.image}`}
                      alt="Neil Portrait"
                      className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </LayoutPage>
  );
};

export default PageProfile;
