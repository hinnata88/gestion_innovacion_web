import React, { useState, useEffect } from 'react';
import { Form, Layout, Row, Table } from 'antd';
import { DateTime } from 'luxon';

import * as storage from 'common/storage';

import { CustomPopup } from 'components';
import { getAllRoles } from 'api/roleServices';

import './styles.scss';

const { Content } = Layout;

export const Roles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadProblems = async () => {
      const storageData = storage.getUser();

      if (storageData.username) {
        const responseData = await getAllRoles();

        const { statusCode, response, message } = responseData;
        if (statusCode === 200) setData(response);
        else CustomPopup('error', message);
      }
    };
    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customTable = () => {
    const customData =
      data.map((current) => {
        return {
          icon: current.icon,
          key: current.id,
          nombre: current.nombre,
          descripcion: current.descripcion || 'Sin descripción',
          permisos: current.permisos || 'No definidos',
          createdAt: DateTime.fromISO(current.createdAt).toLocaleString(DateTime.DATETIME_SHORT)
        };
      }) || [];

    const columnsData = [
      {
        key: 'icon',
        dataIndex: 'icon',
        title: '',
        width: '3%'
      },
      {
        key: 'nombre',
        dataIndex: 'nombre',
        title: 'Nombre',
        width: '20%'
      },
      {
        key: 'descripcion',
        dataIndex: 'descripcion',
        title: 'Descripción',
        width: '30%'
      },
      {
        key: 'permisos',
        dataIndex: 'permisos',
        title: 'Permisos',
        width: '20%'
      },
      {
        key: 'createdAt',
        dataIndex: 'createdAt',
        title: 'Creado',
        width: '20%'
      }
    ];

    return (
      <Table
        dataSource={customData}
        columns={columnsData}
        pagination={{ defaultPageSize: 10, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
      />
    );
  };

  return (
    <Layout className="rolesPage">
      <Content>
        <Row align="middle" className="rolesPage__mainContainer">
          <Form name="normal_login" className="rolesForm" initialValues={{ remember: true }}>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>{customTable()}</Row>
          </Form>
        </Row>
      </Content>
    </Layout>
  );
};

export default Roles;
