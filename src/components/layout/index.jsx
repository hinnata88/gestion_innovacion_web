import React, { useEffect } from 'react';
import { NavLink, Switch, useLocation, Route } from 'react-router-dom';
import { Request, Problems, Roles } from 'screens';

import { Layout, Menu } from 'antd';
import Header from './header';
import { PrivateRoute } from 'routers/';
import useAuth from 'auth/useAuth';
import { AllowAccessToRequest } from 'common/permisionGate';
import './styles.scss';
import { UsergroupAddOutlined, KeyOutlined, ShareAltOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

const BaseLayout = ({ showPortalLink }) => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];
  const auth = useAuth();
  const user = auth.getUser();

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setActive = (path) => (currentPath === path ? `ant-menu-item-selected` : 'ant-menu-item');

  const menuSider = () => {
    return (
      <Sider className="baseLayout__sider" theme="light" trigger={null}>
        <div className="logo" />
        <Menu>
          <Menu.Item key="1" className={setActive('problemas') || setActive('')} active icon={<ShareAltOutlined />}>
            <NavLink to="/problems">Problemas</NavLink>
          </Menu.Item>
          <Menu.Item key="2" className={setActive('roles') || setActive('')} icon={<KeyOutlined />}>
            <NavLink to="/roles">Roles</NavLink>
          </Menu.Item>
          {AllowAccessToRequest(
            <Menu.Item key="3" className={setActive('solicitudes')} icon={<UsergroupAddOutlined />}>
              <NavLink to="/request">Solicitudes</NavLink>
            </Menu.Item>,
            user
          )}
        </Menu>
      </Sider>
    );
  };

  return (
    <Layout className="baseLayout">
      <Sider className="baseLayout__sider" theme="light" trigger={null}>
        {menuSider()}
      </Sider>
      <Layout className="site-layout">
        <Header showPortalLink={showPortalLink} />
        <section>
          <Content className="site-layout-background baseLayout__content">
            <Switch>
              <PrivateRoute
                auth={auth}
                roles={['Master Admin', 'Administrador Aplicaciones']}
                path="/request"
                component={Request}
              />
              <Route exact path="/problems" component={Problems} />
              <Route exact path="/roles" component={Roles} />
            </Switch>
          </Content>
        </section>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
