import React from "react";
import { Card } from "@themesberg/react-bootstrap";

const LayoutPage = ({ children, title }) => {
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-5">{title}</h5>
        {children}
      </Card.Body>
    </Card>
  );
};

export default LayoutPage;
