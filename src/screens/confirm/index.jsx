import React, { useState, useEffect } from 'react';
import { Form, Input, Layout, Row } from 'antd';
import { LockOutlined, SmileOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useHistory, useLocation } from 'react-router-dom';
import { changePasswordAndConfirm, getUserByToken } from '../../api/userServices';

import { CustomButton, CustomPopup, CustomActionForm } from '../../components';

import './styles.scss';

const { Content } = Layout;

export const Confirm = () => {
  const [t] = useTranslation('translation');
  const history = useHistory();

  const [confirmationData, setConfirmationData] = useState({
    data: null,
    error: false,
    confirmedUser: false,
    changedPassword: false
  });
  const [showForm, setShowForm] = useState(true);
  const { search } = useLocation();

  const token = new URLSearchParams(search).get('token');

  const onFinish = async (values) => {
    const { password, newPassword } = values;
    const id = confirmationData.data.id;

    if (password === newPassword) {
      const responseData = await changePasswordAndConfirm(id, token, newPassword);

      const { statusCode, message } = responseData.data;

      if (statusCode === 400) {
        CustomPopup('error', message);
        setConfirmationData({ data: null, error: message, confirmedUser: false, changedPassword: false });
      } else {
        setConfirmationData({ data: responseData.data, error: false, confirmSuccess: true, changedPassword: true });
      }
      setShowForm(false);
    } else {
      CustomPopup('error', t('confirm.passwordsError'));
    }
  };

  const finishComplete = () => {
    history.push('/Login');
  };

  useEffect(() => {
    const userConfirm = async () => {
      if (token) {
        const responseData = await getUserByToken(token);
        console.log(responseData);

        const { statusCode, response, message } = responseData.data;

        if (!response) {
          const errorMessage = 'problema obteniendo el usuario';
          CustomPopup('error', errorMessage);
          setConfirmationData({ data: null, error: errorMessage, confirmedUser: true, changedPassword: false });
          setShowForm(false);
          return;
        }

        if (statusCode === 400) {
          CustomPopup('error', message);
          setConfirmationData({ data: null, error: message, confirmedUser: true, changedPassword: false });
          setShowForm(false);
        } else {
          if (response?.confirmado) {
            setConfirmationData({
              data: response,
              error: `The user ${response.username} is already confirmed!`,
              confirmedUser: true,
              changedPassword: false
            });
            setShowForm(false);
          } else {
            setConfirmationData({ data: response, error: null, confirmedUser: false, changedPassword: false });
            setShowForm(true);
          }
        }
      } else {
        CustomPopup('error', t('confirm.confirmError'));
        history.push('/Login');
      }
    };

    userConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmComplete = () => {
    return (
      <CustomActionForm
        icon={() => {
          return <SmileOutlined />;
        }}
        description={t('confirm.confirmPasswordSuccess')}
        buttonCaption={t('confirm.confirmButtonComplete')}
        handleOnClick={finishComplete}
      />
    );
  };

  const confirmError = () => {
    return (
      <CustomActionForm
        icon={() => {
          return <CloseCircleOutlined />;
        }}
        description={confirmationData.error}
        buttonCaption={t('confirm.confirmButtonComplete')}
        handleOnClick={finishComplete}
      />
    );
  };

  const confirmScreen = () => {
    return !showForm && confirmationData.confirmedUser ? confirmError() : confirmComplete();
  };

  const confirmForm = () => {
    return (
      <Form name="normal_confirm" className="confirmForm" onFinish={onFinish}>
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="confirmForm__title">{t('confirm.title')}</h3>
        </Row>
        <Form.Item name="password" rules={[{ required: true, message: t('confirm.requiredError') }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('confirm.passwordField')}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: t('confirm.requiredError') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(t('confirm.passwordsError'));
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('confirm.newPasswordField')}
          />
        </Form.Item>
        <Form.Item>
          <CustomButton
            caption={t('confirm.confirmButton')}
            htmlType={'submit'}
            type={'primary'}
            className={'confirmation-form-button'}
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout className="confirmPage">
      <Content>
        <Row align="middle" className="confirmPage__mainContainer">
          {showForm ? confirmForm() : confirmScreen()}
        </Row>
      </Content>
    </Layout>
  );
};

export default Confirm;
