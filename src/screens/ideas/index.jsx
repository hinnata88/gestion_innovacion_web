import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Layout, Row, Table } from 'antd';
import { CheckOutlined, CloseOutlined, PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import { DateTime } from 'luxon';

import * as storage from 'common/storage';
import useAuth from 'auth/useAuth';

import { CustomPopup, CustomModal, CustomButton } from 'components';
import { WrapperPopConfirm } from 'wrappers';
import { changeIdeaStatus, getAllIdeasByFilter } from 'api/ideasServices';

import AddForm from './add-form/index';

import './styles.scss';
import { ESTADO_COMUN } from 'common/enums';

const { Content } = Layout;

export const Ideas = ({ problemId }) => {
  const submitButtonRef = useRef();
  const history = useHistory();
  const auth = useAuth();
  const userData = auth.user?.data.user;

  const [data, setData] = useState([]);

  const loadIdeas = async () => {
    const storageData = storage.getUser();

    if (storageData.username) {
      const userUO = userData.uo || 0;
      const responseData = await getAllIdeasByFilter({ id: problemId, uo: userUO });
      const { statusCode, response, message } = responseData;

      console.log(response);

      if (statusCode === 200) setData(response);
      else CustomPopup('error', message);
    }
  };
  
  useEffect(() => {
    loadIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const customTable = () => {
    const handleDeny = async (key) => {
      const res = await changeIdeaStatus(key, ESTADO_COMUN.DENEGADO);
      if (res.statusCode === 200) {
        await loadIdeas();
        CustomPopup('success', 'La idea ha sido denegada');
      } else CustomPopup('error', res.message);
    };
    const handleApprove = async (key) => {
      const res = await changeIdeaStatus(key, ESTADO_COMUN.APROBADO);
      if (res.statusCode === 200) {
        await loadIdeas();
        CustomPopup('success', 'La idea ha sido aprobada');
      } else CustomPopup('error', res.message);
    };

    const customData =
      data.map((idea) => {
        return {
          id: idea.id,
          nombre: idea.nombre,
          descripcion: idea.descripcion || 'Sin descripción',
          estado: idea.estado,
          problema: idea.problemas.map((p) => p.nombre + " " ),
          createdAt: DateTime.fromISO(idea.createdAt).toLocaleString()
        };
      }) || []; 

    const columnsData = userData.rolID === 6?[
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
        key: 'problema',
        dataIndex: 'problema',
        title: 'Problema',
        align: 'center',
        width: '10%'
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
            {}
            <WrapperPopConfirm
              record={record}
              icon={<CheckOutlined />}
              messageToShow={'Seguro que desea aprobar la idea'}
              type="ok"
              handleFun={handleApprove}
              toolTipMessage={'Aprobar'}
            />
            <WrapperPopConfirm
              record={record}
              icon={<CloseOutlined />}
              messageToShow={'Seguro que desea denegar la idea'}
              type="delete"
              danger={true}
              handleFun={handleDeny}
              toolTipMessage={'Denegar'}
            />
            <CustomButton
              icon={<ShareAltOutlined />}
              danger={false}
              handleAction={() => {
                history.push('/problems');
              }}
              toolTipMessage={'Problemas'}
            />
          </>
        )
      }
    ]:
    [
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
        key: 'problema',
        dataIndex: 'problema',
        title: 'Problema',
        align: 'center',
        width: '10%'
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
            {}
            <CustomButton
              icon={<ShareAltOutlined />}
              danger={false}
              handleAction={() => {
                history.push('/problems');
              }}
              toolTipMessage={'Problemas'}
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
    const modalProperties = { title: 'Crear Idea!', className: 'custom-modal' };
    const buttonProperties = {
      caption: 'Adicionar Idea',
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
    <Layout className="ideasPage">
      <Content>
        <Row align="middle" className="ideasPage__mainContainer">
          <Form name="normal_login" className="ideasForm" initialValues={{ remember: true }}>
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

export default Ideas;
