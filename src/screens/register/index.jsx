import React, { useEffect, useState } from 'react';
import { Form, Input, Layout, Row, Select } from 'antd';
import { UserOutlined, MailOutlined, UserAddOutlined, SmileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useHistory } from 'react-router-dom';
import { getAllRoles } from 'api/roleServices';
import { registerUser } from 'api/userServices';
import { unidadOrganizativa } from 'data/mookData';

import { CustomButton, CustomPopup, CustomActionForm } from '../../components';

import './styles.scss';

const { Content } = Layout;
const { Option } = Select;

export const Register = () => {
  const [t] = useTranslation('translation');
  const [register, setRegisterUserData] = useState({ data: null, error: false, loading: false, registerSuccess: false });
  const [roles, setRoles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const loadRoles = async () => {
      const { statusCode, response, message } = await getAllRoles();
      statusCode === 200 ? setRoles(response) : CustomPopup('error', `ERROR: ${message}`);
    };

    loadRoles();
  }, []);

  const finishRegisterForm = async (values) => {
    const { name, lastName, position, role, email, uo } = values;
    const { statusCode, response, message } = await registerUser(name, lastName, position, role, email, uo);

    if (statusCode === 200) {
      CustomPopup('success', t('register.confirmSuscces'));
      setRegisterUserData({ data: response, error: false, loading: false, registerSuccess: true });
    } else CustomPopup('error', message);
  };

  const finishCompleteForm = () => {
    history.push('/login');
  };

  const registerComplete = () => {
    const description = t('register.registerSuccess')
      .replace('{0}', register.data.nombreUsuario)
      .replace('{1}', register.data.email);

    return (
      <CustomActionForm
        icon={() => {
          return <SmileOutlined />;
        }}
        description={description}
        buttonCaption={t('register.registerButtonComplete')}
        handleOnClick={finishCompleteForm}
      />
    );
  };

  const registerForm = () => {
    return (
      <Form name="normal_register" className="registerForm" onFinish={finishRegisterForm}>
        <Row style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px' }}>
          <h3 className="registerForm__title">{t('register.title')}</h3>
        </Row>
        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: t('register.mailError') },
            { required: true, message: t('register.requiredError') }
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t('register.emailField')} />
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true, message: t('register.requiredError') }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('register.nameField')} />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: t('register.requiredError') }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('register.lastNameField')} />
        </Form.Item>
        <Form.Item name="position" rules={[{ required: true, message: t('register.requiredError') }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('register.positionField')} />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true, message: t('register.requiredError') }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder={t('register.roleField')}>
            {roles.map((p) => {
              return (
                <Option key={p.id} value={p.id} disabled={!p.selectable}>
                  <div className="demo-option-label-item">
                    <span role="img" aria-label={p.nombre} style={{ marginRight: '5px' }}>
                      {p.icon}
                    </span>
                    {p.nombre}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="uo" rules={[{ required: true, message: t('register.requiredError') }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder={t('register.uoField')}>
            {unidadOrganizativa.map((p) => {
              return (
                <Option key={p.id} value={p.id}>
                  {p.nombre}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <CustomButton
            caption={t('register.registerButton')}
            htmlType={'submit'}
            type={'primary'}
            className={'register-form-button'}
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout className="registerPage">
      <Content>
        <Row align="middle" className="registerPage__mainContainer">
          {!register.registerSuccess ? registerForm() : registerComplete()}
        </Row>
      </Content>
    </Layout>
  );
};

export default Register;
