import React, { useState, useEffect } from 'react';
import { Form, Layout, Row, Table } from 'antd';
import { DateTime } from 'luxon';

import { getAllRequest, approveRequest, deniedRequest } from 'api/requestServices';

import { WrapperPopConfirm } from 'wrappers';

import './styles.scss';
import { CustomPopup } from 'components';
import { ESTADO_COMUN, ESTADO_SOCILICUD } from 'common/enums';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Content } = Layout;

export const Request = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequest = async () => {
      const data = await getAllRequest();
      setRequests(data.response);
    };
    loadRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CustomTable = () => {
    const handleDeny = async (key) => {
      const res = await deniedRequest(key);

      if (res.statusCode === 200) {
        CustomPopup('success', 'Solicitud denegada');

        const requestData = await getAllRequest();
        setRequests(requestData.response);
      } else CustomPopup('error', res.message);
    };

    const handleAprove = async (key) => {
      const res = await approveRequest(key);

      if (res.statusCode === 200) {
        CustomPopup('success', 'Solicitud aprobada');

        const requestData = await getAllRequest();
        setRequests(requestData.response);
      } else CustomPopup('error', res.message);
    };

    const requestsData =
      requests?.map((p) => {
        return {
          key: p.id,
          id: p.uniqueId,
          user: p.usuario.nombreUsuario,
          date: DateTime.fromISO(p.createdAt).toLocaleString(DateTime.DATETIME_SHORT),
          state:
            p.estado === ESTADO_SOCILICUD.PENDIENTE_ADMIN_APP || p.estado === ESTADO_SOCILICUD.PENDIENTE_MASTER
              ? ESTADO_COMUN.PENDIENTE
              : p.estado
        };
      }) || [];

    const columnsData = [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'Id Unico',
        align: 'center',
        width: '30%'
      },
      {
        key: 'user',
        dataIndex: 'user',
        title: 'Usuario Solicita',
        width: '20%'
      },
      {
        key: 'date',
        dataIndex: 'date',
        title: 'Fecha',
        align: 'center',
        width: '10%'
      },
      {
        key: 'state',
        dataIndex: 'state',
        title: 'Estado',
        align: 'center',
        width: '10%'
      },
      {
        key: 'Options',
        dataIndex: 'Options',
        title: 'Opciones',
        width: '10%',
        align: 'center',
        render: (_, record) => (
          <>
            <WrapperPopConfirm
              record={record}
              icon={<CheckOutlined />}
              messageToShow={'Seguro que desea aprobar la solicitud'}
              type="ok"
              handleFun={handleAprove}
              toolTipMessage={'Aprobar'}
            />
            <WrapperPopConfirm
              record={record}
              icon={<CloseOutlined />}
              messageToShow={'Seguro que desea denegar la solicitud'}
              type="delete"
              danger={true}
              handleFun={handleDeny}
              toolTipMessage={'Denegar'}
            />
          </>
        )
      }
    ];

    return (
      <Table
        dataSource={requestsData}
        columns={columnsData}
        pagination={{ defaultPageSize: 6, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
      />
    );
  };

  return (
    <Layout className="requestPage">
      <Content>
        <Row align="middle" className="requestPage__mainContainer">
          <Form name="normal_login" className="requestForm" initialValues={{ remember: true }}>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>{CustomTable()}</Row>
          </Form>
        </Row>
      </Content>
    </Layout>
  );
};

export default Request;
