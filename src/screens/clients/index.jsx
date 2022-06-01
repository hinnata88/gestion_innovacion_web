import React, { useState, useEffect, useRef } from 'react';
import { Form, Layout, Row, Table } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { DateTime } from 'luxon';

import * as storage from 'common/storage';

import { CustomPopup, CustomModal } from 'components';
import { WrapperPopConfirm } from 'wrappers';
import { getAllClients, deleteClient } from 'api/clientServices';

import AddForm from './add-form/index';

import './styles.scss';

const { Content } = Layout;

export const Clients = () => {
  const submitButtonRef = useRef();

  const [data, setData] = useState([]);

  const loadClients = async () => {
    const storageData = storage.getUser();

    if (storageData.username) {
      const responseData = await getAllClients();
      const { statusCode, response, message } = responseData;

      if (statusCode === 200) setData(response);
      else CustomPopup('error', message);
    }
  };

  useEffect(() => {
    loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customTable = () => {
    const handleDelete = async (key) => {
      const res = await deleteClient(key);
      if (res.statusCode === 200) {
        await loadClients();
        CustomPopup('success', 'El cliente ha sido eliminado');
      } else CustomPopup('error', res.message);
    };

    const customData =
      data.map((client) => {
        return {
          key: client.id,
          nombre: client.nombre,
          tipo: client.uo ? 'Interno' : 'Tercero',
          uo: client.uo,
          codigo_uo: client.codigo_uo,
          codigo_reup: client.codigo_reup,
          no_contrato: client.no_contrato,
          organismo: client.organismo,
          createdAt: DateTime.fromISO(client.createdAt).toLocaleString()
        };
      }) || [];

    const columnsData = [
      {
        key: 'nombre',
        dataIndex: 'nombre',
        title: 'Nombre',
        width: '20%',
        onFilter: (value, record) => record.nombre.indexOf(value) === 0,
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
        sortDirections: ['descend', 'ascend']
      },
      {
        key: 'tipo',
        dataIndex: 'tipo',
        title: 'tipo',
        width: '10%'
      },
      {
        key: 'uo',
        dataIndex: 'uo',
        title: 'Unidad Organizativa',
        align: 'center',
        width: '10%'
      },
      {
        key: 'codigo_uo',
        dataIndex: 'codigo_uo',
        title: 'Codigo UO',
        align: 'center',
        width: '10%'
      },
      {
        key: 'codigo_reup',
        dataIndex: 'codigo_reup',
        title: 'REUP',
        align: 'center',
        width: '10%'
      },
      {
        key: 'no_contrato',
        dataIndex: 'no_contrato',
        title: 'No. Contrato',
        align: 'center',
        width: '10%'
      },
      {
        key: 'organismo',
        dataIndex: 'organismo',
        title: 'Organismo',
        align: 'center',
        width: '10%'
      },
      {
        key: 'createdAt',
        dataIndex: 'createdAt',
        title: 'Creado',
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
              icon={<CloseOutlined />}
              messageToShow={'Seguro que desea eliminar el cliente'}
              type="delete"
              danger={true}
              handleFun={handleDelete}
              toolTipMessage={'Eliminar'}
            />
          </>
        )
      }
    ];

    return (
      <Table
        dataSource={customData}
        columns={columnsData}
        pagination={{ defaultPageSize: 6, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
      />
    );
  };

  const addButton = () => {
    const modalProperties = { title: 'Crear Cliente!', className: 'custom-modal' };
    const buttonProperties = {
      caption: 'Adicionar Cliente',
      type: 'primary',
      className: 'action-button',
      icon: <PlusOutlined />
    };

    const handleOk = () => {
      submitButtonRef.current.click();
    };

    return (
      <CustomModal
        modalProperties={modalProperties}
        buttonProperties={buttonProperties}
        component={<AddForm useData={[data, setData]} submitButtonRef={submitButtonRef} />}
        handleOK={handleOk}
      />
    );
  };

  return (
    <Layout className="clientPage">
      <Content>
        <Row align="middle" className="clientPage__mainContainer">
          <Form name="normal_login" className="clientForm" initialValues={{ remember: true }}>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              {addButton()}
              {customTable()}
            </Row>
          </Form>
        </Row>
      </Content>
    </Layout>
  );
};

export default Clients;
