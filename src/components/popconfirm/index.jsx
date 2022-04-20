import React, { memo } from 'react';
import { Popconfirm } from 'antd';

const CustomPopConfirm = ({ popProperties, children, record, openPopConfirmState, handleOK }) => {
  const [isOpenPopConfirm, setOpenPopConfirm] = openPopConfirmState;

  const { title, okText, cancelText } = popProperties;

  const popConfirmOK = async (key) => {
    if (handleOK) await handleOK(key);
    setOpenPopConfirm(false);
  };

  const popConfirmCancel = () => {
    setOpenPopConfirm(false);
  };

  return (
    <Popconfirm
      title={title}
      visible={isOpenPopConfirm}
      onConfirm={() => popConfirmOK(record.key)}
      onCancel={() => popConfirmCancel()}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  );
};

export default memo(CustomPopConfirm);
