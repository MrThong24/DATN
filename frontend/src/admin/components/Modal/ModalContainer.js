import { Modal } from "antd";
import React, { useState } from "react";

const ModalContainer = ({ children, width }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      footer={null}
      onCancel={handleCancel}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
