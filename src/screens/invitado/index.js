import React from 'react';
import { Layout, Row } from 'antd';

import './styles.scss';

const { Content } = Layout;

export const Invitado = () => {
  return (
    <Layout className="registerPage">
      <Content>
        <Row align="middle" className="registerPage__mainContainer">
          Invitado PAGE
        </Row>
      </Content>
    </Layout>
  );
};

export default Invitado;
