import React, { useEffect } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { CaretDownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';

import AvatarDefault from 'assets/svg/avatar.svg';
import useAuth from '../../../auth/useAuth';
import '../styles.scss';

const { Header: AntHeader } = Layout;

const Header = ({ showPortalLink }) => {
  const [t] = useTranslation('translation');

  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    const checkLogin = () => {
      if (!auth.isLogIn()) {
        history.push('/login');
      }
    };

    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    auth.logOut();
    history.push('/login');
  };

  const handleLogoutAction = () => logout();

  const menu = (
    <Menu>
      <Menu.Item icon={<SettingOutlined />}>
        <NavLink to="/configurations">{t('header.profile.configuration')}</NavLink>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={handleLogoutAction}>
        {t('header.profile.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="baseLayout__header">
      <div className="header-profile">
        <Dropdown overlay={auth.isLogIn() ? menu : null} placement="bottomRight" trigger={auth.isLogIn() ? ['click'] : []}>
          <span className="baseLayout__header-account">
            <Avatar size={30} icon={<img src={AvatarDefault} alt="User" />} />
            <span className="username">
              {auth.getUserName() || '--/--'} <CaretDownOutlined />
            </span>
          </span>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
