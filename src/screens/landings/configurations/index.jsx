import React, { useState } from 'react';
import { Form, Input, Layout, Row } from 'antd';
import {  MailOutlined, SmileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useHistory } from 'react-router-dom';
import { createConfiguration } from '../../../api/configServices';

import { BaseLayout, CustomButton, CustomPopup, CustomActionForm } from '../../../components';

import './styles.scss';

const { Content } = Layout;

export const Configurations = () => {
  const [t] = useTranslation('translation');
  const [configurations_email, setConfigurations_emailData] = useState({ data: null, error: false, loading: false, registerSuccess: false });
  const history = useHistory();

  const finishConfigurationForm = async (values) => {
    const { email_contact, email_register, email_appointment } = values;

    const responseData = await createConfiguration(email_contact, email_register, email_appointment);
    const { statusCode, message } = responseData.data;
    if (statusCode === 400) {
      CustomPopup('error', message);
      setConfigurations_emailData({ data: null, error: message, loading: false, registerSuccess: false });
    } else {
      const configurations = {
        email_contact,
        email_register,
        email_appointment        
      };    
      CustomPopup('success', t('configurations.configurationsSeccesMessage'));
      setConfigurations_emailData({ data: configurations, error: false, loading: false, registerSuccess: true });
    }
  };

  const finishCompleteForm = () => {
    history.push('/Login');     
  };

  const configurationsComplete = () => {
    const description = t('configurations.descriptionSuscces');
    return (
      <CustomActionForm
        icon={() => {
          return <SmileOutlined />;
        }}
        // title={t('register.titleComplete')}
        description={description}
        buttonCaption={t('configurations.configurationsButtonComplete')}
        handleOnClick={finishCompleteForm}
      />
    );
  };

  const configurationsForm = () => {
    return (
      <Form name="normal_configurations" className="registerForm" onFinish={finishConfigurationForm}>
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="registerForm__title">{t('configurations.title')}</h3>
        </Row>

        <Form.Item
          name="email_contact"
          rules={[
            { type: 'email', message: t('configurations.mailError') },
            { required: true, message: t('configurations.requiredError') }
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t('configurations.email_contactField')} />
        </Form.Item>

        <Form.Item
          name="email_register"
          rules={[
            { type: 'email', message: t('configurations.mailError') },
            { required: true, message: t('configurations.requiredError') }
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t('configurations.email_registerField')} />
        </Form.Item>

        <Form.Item
          name="email_appointment"
          rules={[
            { type: 'email', message: t('configurations.mailError') },
            { required: true, message: t('configurations.requiredError') }
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t('configurations.email_appointmentField')} />
        </Form.Item>

        <Form.Item>
          <CustomButton
            caption={t('configurations.configurationsButton')}
            htmlType={'submit'}
            type={'primary'}
            className={'register-form-button'}
          />
        </Form.Item>
      </Form>
    );
  };

  const configurationsComponent = () => (
    <Layout className="registerPage bg-gradient-chill">
      <Content>
        <Row align="middle" className="registerPage__mainContainer">
          {!configurations_email.registerSuccess ? configurationsForm() : configurationsComplete()}
        </Row>
      </Content>
    </Layout>
  );

  return <BaseLayout component={configurationsComponent} showPortalLink={true} />;
};

export default Configurations;
