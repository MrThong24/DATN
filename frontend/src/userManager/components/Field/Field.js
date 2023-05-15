import React from "react";
import { Col } from "@themesberg/react-bootstrap";

const Field = ({ title, name }) => {
  return (
    <Col md={6} style={{ display: "flex", alignItems: "center" }}>
      <h6 style={{ fontWeight: 700, fontSize: "16px" }}>
        {title} : <span style={{ fontWeight: 500 }}>{name}</span>
      </h6>
    </Col>
  );
};

export default Field;
