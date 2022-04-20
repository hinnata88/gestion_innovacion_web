import React, { useState, memo } from 'react';

import { CustomPopConfirm, CustomButton } from 'components';

const WrapperPopConfirm = ({ record, icon, messageToShow, danger, handleFun, toolTipMessage }) => {
  const [isOpenPopConfirm, setOpenPopConfirm] = useState(false);

  const handleProperties = () => {
    return {
      title: messageToShow,
      okText: 'Si',
      cancelText: 'No'
    };
  };

  return (
    <CustomPopConfirm
      popProperties={handleProperties()}
      record={record}
      handleOK={handleFun}
      openPopConfirmState={[isOpenPopConfirm, setOpenPopConfirm]}
    >
      <CustomButton toolTipMessage={toolTipMessage} icon={icon} danger={danger} handleAction={() => setOpenPopConfirm(true)} />
    </CustomPopConfirm>
  );
};

export default memo(WrapperPopConfirm);
