import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { CaretDownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';

import AvatarDefault from 'assets/svg/avatar.svg';

import useAuth from '../../../auth/useAuth';
import * as storage from '../../../common/storage';

import './styles.scss';

const Navigation = () => {
  const user = storage.getUser();
  const [t, i18n] = useTranslation('translation');

  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth.logOut();
    history.push('/login');
  };

  const handleLogoutAction = () => logout();

  const changeLanguage = (e) => {
    const choiseLng = e.target.innerText.toLowerCase();
    i18n.changeLanguage(choiseLng === 'en' ? 'en-US' : 'es-US');
  };

  const _features = t('portal_navigation.features');
  const _about = t('portal_navigation.about');
  const _services = t('portal_navigation.services');
  const _gallery = t('portal_navigation.gallery');
  const _testimonials = t('portal_navigation.testimonials');
  const _team = t('portal_navigation.team');
  const _contact = t('portal_navigation.contact');

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
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/* <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {' '}
            <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span>{' '}
            <span className="icon-bar"></span> <span className="icon-bar"></span>{' '}
          </button> */}
          <a className="navbar-brand page-scroll" href="#page-top">
            NCCH
          </a>{' '}
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                {_features}
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                {_about}
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                {_services}
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                {_gallery}
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                {_testimonials}
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                {_team}
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                {_contact}
              </a>
            </li>
            <li>
              <a href="/Login" className="page-scroll">
                {user?.username || t('login.buttonLogin')}
              </a>
            </li>
          </ul>
        </div>
        <div className="profile">
          <Dropdown overlay={auth.isLog() ? menu : null} trigger={auth.isLog() ? ['click'] : []}>
            <span className="profile-account">
              <Avatar size={30} icon={<img src={AvatarDefault} alt="User" />} />
              <span className="profile-username">
                {auth.getUserName()} <CaretDownOutlined />
              </span>
            </span>
          </Dropdown>
        </div>
        <div className="lang">
          <span
            contentEditable={false}
            onClick={(e) => changeLanguage(e)}
            className={i18n.language === 'en-US' ? 'span-active' : null}
          >
            EN
          </span>
          <span
            contentEditable={false}
            onClick={(e) => changeLanguage(e)}
            className={i18n.language === 'es-US' ? 'span-active' : null}
          >
            ES
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
