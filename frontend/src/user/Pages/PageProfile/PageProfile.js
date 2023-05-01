import React, { useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Button, Form, Modal } from "antd";
import ProfileCover from "../../../assets/img/profile-cover.jpg";
import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";
import Field from "../../components/Field/Field";
import LayoutPage from "../../layout/LayoutPage";
import EditPageProfile from "./EditPageProfile";
import "../../../styles/general.css";

const PageProfile = () => {
  const [isModalOpenEditProfile, setIsModalOpenEditProfile] = useState(false);
  const showModalEditProfile = () => {
    setIsModalOpenEditProfile(true);
  };
  const handleOk = () => {
    setIsModalOpenEditProfile(false);
  };
  const handleCancel = () => {
    setIsModalOpenEditProfile(false);
  };
  return (
    <LayoutPage title="Thông tin cá nhân">
      <Form className="row-col">
        <Row>
          <Col xs={12} xl={8}>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="Tên nhân viên" name="Bùi Chí Thông"></Field>
              <Field title="Giới tính" name="Nam"></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="Tên phòng ban" name="Thợ mộc"></Field>
              <Field title="Chức vụ" name="Kỹ sư xây dựng"></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="Mã nhân viên" name="TNV-00001"></Field>
              <Field
                title="Quê quán"
                name="Đại Phong, Đại Lộc, Quảng Nam"
              ></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="CMND/CCCD" name="206430976"></Field>
              <Field title="Số điện thoại" name="0795590868"></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="Nơi ở hiện tại" name="Ngô Gia Khảm"></Field>
              <Field
                title="Thông tin liên hệ khẩn cấp"
                name="0795590868"
              ></Field>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Field title="Ngày sinh" name="02/04/2001"></Field>
              <Field title="Lương" name="20.000.000 đ"></Field>
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
                      src={Profile1}
                      alt="Neil Portrait"
                      className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                    />
                    <Card.Title>Bùi Chí Thông</Card.Title>
                    <Card.Subtitle className="fw-normal">
                      Kỹ sư xây dựng
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button
            type="primary"
            onClick={showModalEditProfile}
            className="signInBtn"
            style={{
              width: "320px",
              backgroundColor: "#262b40",
              height: "38px",
              fontSize: "16px",
            }}
          >
            Chỉnh sửa
          </Button>
        </div>
      </Form>
      <Modal
        open={isModalOpenEditProfile}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1300}
      >
        <EditPageProfile></EditPageProfile>
      </Modal>
    </LayoutPage>
  );
};

export default PageProfile;
