import React, { useState } from 'react';
import { Modal } from 'antd';

import { CustomButton } from '..';

import './styles.scss';

const CustomModal = ({ modalProperties, buttonProperties, component, handleOK }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const okButton = () => {
    handleOK();
    closeModal();
  };

  const buttonModal = () => {
    const { caption, icon, className, shape, danger, type } = buttonProperties;

    return (
      <CustomButton
        caption={caption}
        type={type}
        className={className}
        handleAction={openModal}
        icon={icon}
        shape={shape}
        danger={danger}
      />
    );
  };

  const customModal = () => {
    const { title, className } = modalProperties;
    return (
      <Modal className={className} title={title} visible={isModalVisible} onOk={okButton} onCancel={closeModal}>
        {component}
      </Modal>
    );
  };

  return (
    <>
      {buttonModal()}
      {customModal()}
    </>
  );
};

export default CustomModal;
