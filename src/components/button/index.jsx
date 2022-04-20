import React from 'react';

import { Button, Tooltip } from 'antd';

import './styles.scss';

const CustomButton = ({
  caption,
  className,
  handleAction,
  htmlType = 'button',
  type = 'default',
  shape = 'default',
  icon = null,
  danger = false,
  toolTipMessage = ''
}) => {
  return (
    <Tooltip placement="top" title={toolTipMessage}>
      <Button
        className={className}
        type={type}
        htmlType={htmlType}
        onClick={handleAction}
        shape={shape}
        icon={icon}
        danger={danger}
      >
        {caption}
      </Button>
    </Tooltip>
  );
};

export default CustomButton;
