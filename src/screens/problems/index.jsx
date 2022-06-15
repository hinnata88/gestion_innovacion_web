import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Layout, Row, Table } from 'antd';
import { CheckOutlined, CloseOutlined, CoffeeOutlined, PlusOutlined } from '@ant-design/icons';
import { DateTime } from 'luxon';

import * as storage from 'common/storage';
import useAuth from 'auth/useAuth';

import { CustomPopup, CustomModal, CustomButton } from 'components';
import { WrapperPopConfirm } from 'wrappers';
import { changeProblemStatus, getAllProblemsByUO } from 'api/problemsServices';

import AddForm from './add-form/index';

import './styles.scss';
import { ESTADO_COMUN } from 'common/enums';

const { Content } = Layout;

export const Problems = () => {
  const submitButtonRef = useRef();
  const history = useHistory();
  const auth = useAuth();

  const [data, setData] = useState([]);

  const loadProblems = async () => {
    const storageData = storage.getUser();

    if (storageData.username) {
      const userUO = auth.user?.data.user.uo || 0;
      const responseData = await getAllProblemsByUO(userUO);

      const { statusCode, response, message } = responseData;
      if (statusCode === 200) setData(response);
      else CustomPopup('error', message);
    }
  };

  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customTable = () => {
    const handleDeny = async (key) => {
      const res = await changeProblemStatus(key, ESTADO_COMUN.DENEGADO);
      if (res.statusCode === 200) {
        await loadProblems();
        CustomPopup('success', 'El problema ha sido denegado');
      } else CustomPopup('error', res.message);
    };
    const handleApprove = async (key) => {
      const res = await changeProblemStatus(key, ESTADO_COMUN.APROBADO);
      if (res.statusCode === 200) {
        await loadProblems();
        CustomPopup('success', 'El problema ha sido aprobado');
      } else CustomPopup('error', res.message);
    };

    const customData =
      data.map((problem) => {
        return {
          key: problem.id,
          nombre: problem.nombre,
          descripcion: problem.descripcion || 'Sin descripción',
          estado: problem.estado,
          createdAt: DateTime.fromISO(problem.createdAt).toLocaleString()
        };
      }) || [];

    const columnsData = [
      {
        key: 'nombre',
        dataIndex: 'nombre',
        title: 'Nombre',
        width: '30%'
      },
      {
        key: 'descripcion',
        dataIndex: 'descripcion',
        title: 'Descripción',
        width: '30%'
      },
      {
        key: 'estado',
        dataIndex: 'estado',
        title: 'Estado',
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
              icon={<CheckOutlined />}
              messageToShow={'Seguro que desea aprobar el problema'}
              type="ok"
              handleFun={handleApprove}
              toolTipMessage={'Aprobar'}
            />
            <WrapperPopConfirm
              record={record}
              icon={<CloseOutlined />}
              messageToShow={'Seguro que desea denegar el problema'}
              type="delete"
              danger={true}
              handleFun={handleDeny}
              toolTipMessage={'Denegar'}
            />
            <CustomButton icon={<CoffeeOutlined />} danger={false} handleAction={() => {
                history.push('/ideas');
              }} toolTipMessage={'Ideas'} />
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
    const modalProperties = { title: 'Crear Problema!', className: 'custom-modal' };
    const buttonProperties = {
      caption: 'Adicionar Problema',
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
    <Layout className="appointmentsPage">
      <Content>
        <Row align="middle" className="appointmentsPage__mainContainer">
          <Form name="normal_login" className="appointmentsForm" initialValues={{ remember: true }}>
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

export default Problems;