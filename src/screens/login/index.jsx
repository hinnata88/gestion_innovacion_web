import React, { useState, useEffect } from 'react';
import { Form, Input, Layout, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useAuth from 'auth/useAuth';

import { useHistory } from 'react-router-dom';
import { loginUser } from 'api/userServices';

import { CustomButton, CustomPopup } from '../../components';

import './styles.scss';

const { Content } = Layout;

export const Login = () => {
  const [t, i18n] = useTranslation('translation');
  const [loginUserData, setLoginUserData] = useState({ data: null, error: false, loading: false });
  const history = useHistory();
  const auth = useAuth();

  useEffect(() => {
    const checkRedirect = () => {
      if (auth.isLogIn()) {
        const idContextUserRol = auth.getUserRol();

        const rolNumMasterAdmin = auth.getRolIdFromRolName('Master Admin');
        const rolNumAdminApp = auth.getRolIdFromRolName('Administrador Aplicacion');

        if (idContextUserRol === rolNumMasterAdmin || idContextUserRol === rolNumAdminApp) {
          history.push('/request');
        } else {
          history.push('/roles');
        }
      }
    };

    checkRedirect();
  });

  useEffect(() => {
    const checkLogin = () => {
      if (loginUserData.data) {
        auth.logIn(loginUserData.data);
      }
    };

    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, loginUserData]);

  /*useEffect(() => {
    const localStorageCheck = () => {
      const data = storage.getUser();
      storage.setUser(!data ? { username: '', role: '', language: i18n.language } : { ...data, language: i18n.language });
    };

    localStorageCheck();
  }, [i18n.language]);*/

  const onFinish = async (values) => {
    const { username, password } = values;
    setLoginUserData({ data: null, error: false, loading: true });
    const { statusCode, response, message } = await loginUser(username, password);

    if (statusCode === 200) {
      if (!response) {
        const error = 'El usuario no existe';
        CustomPopup('error', `ERROR: ${error}`);
        setLoginUserData({ data: null, error: error, loading: false });
        return null;
      }

      if (!response.confirmado) {
        const error = 'El usuario no esta confirmado, contacte a su administrador de aplicaciones';
        CustomPopup('error', `ERROR: ${error}`);
        setLoginUserData({ data: null, error: error, loading: false });
        return null;
      }

      const user = {
        user: response,
        language: i18n.language
      };
      CustomPopup('success', 'Autenticación Satisfactoria');
      setLoginUserData({ data: user, error: false, loading: false });
    } else CustomPopup('error', message);
  };

  const goToRegister = () => history.push('/Register');

  return (
    <Layout className="loginPage">
      <Content>
        <Row align="middle" className="loginPage__mainContainer">
          <Form name="normal_login" className="loginForm" initialValues={{ remember: true }} onFinish={onFinish}>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="loginForm__title">{t('login.title')}</h3>
            </Row>
            <Form.Item name="username" rules={[{ required: true, message: t('login.requiredError') }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('login.usernameField')} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: t('login.requiredError') }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t('login.passwordField')}
              />
            </Form.Item>
            <Form.Item>
              <CustomButton caption={t('login.buttonLogin')} handleAction={null} htmlType={'submit'} type={'primary'} />
              <CustomButton caption={t('login.registerButton')} handleAction={goToRegister} />
            </Form.Item>
          </Form>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
