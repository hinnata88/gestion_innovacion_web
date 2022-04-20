import React from 'react';
import { Form, Row, Result } from 'antd';

import { CustomButton } from '..';

import './styles.scss';

const CustomActionForm = ({ icon, title, description, buttonCaption, handleOnClick }) => {
  return (
    <Form name="normal_modal" className="modalForm" onFinish={handleOnClick}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 className="modalForm__title">{title}</h3>
      </Row>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        <Result icon={icon()} title={description} />
      </Row>
      <Form.Item>
        <CustomButton caption={buttonCaption} htmlType={'submit'} type={'primary'} className={'action-button'} />
      </Form.Item>
    </Form>
  );
};

export default CustomActionForm;
