import React, { useState, useEffect, useRef } from 'react';
import { Form, Layout, Row, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//import { DateTime } from 'luxon';

import * as storage from 'common/storage';
//import useAuth from 'auth/useAuth';

import { CustomPopup, CustomModal } from 'components';
import { getAllBudget } from 'api/budgetServices';

import AddForm from './add-form/index';

import './styles.scss';

const { Content } = Layout;

export const Gastos = () => {
  const submitButtonRef = useRef();
  //const auth = useAuth();
  const [data, setData] = useState([]);
  
  const loadGastos = async () => {
    const storageData = storage.getUser();
    if (storageData.username) {
      //const userUO = auth.user?.data.user.uo || 0;
      const responseData = await getAllBudget();

      const { statusCode, response, message } = responseData;
      if (statusCode === 200) setData(response);
      else CustomPopup('error', message);
    }
  };

  useEffect(() => {
    loadGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expandedRowRender = () => {
    const columnsD = [
      {
        key: 'elemento',
        dataIndex: 'elemento',
        title: 'Elemento Gastos',
        fixed: 'left',
        width: 110
      },
      { title: 'Ene', dataIndex: 'mes', key: 1 },
      { title: 'Feb', dataIndex: 'mes', key: 2 },
      { title: 'Mar', dataIndex: 'mes', key: 3 },
      { title: 'Abr', dataIndex: 'mes', key: 4 },
      { title: 'May', dataIndex: 'mes', key: 5 },
      { title: 'Jun', dataIndex: 'mes', key: 6 },
      { title: 'Jul', dataIndex: 'mes', key: 7 },
      { title: 'Ago', dataIndex: 'mes', key: 8 },
      { title: 'Sep', dataIndex: 'mes', key: 9 },
      { title: 'Oct', dataIndex: 'mes', key: 10 },
      { title: 'Nov', dataIndex: 'mes', key: 11 },
      { title: 'Dic', dataIndex: 'mes', key: 12 },
      {
        key: 'total',
        dataIndex: 'total',
        title: 'Total',
        fixed: 'right',
        width: 100,
        align: 'center',
        render: (_, record) => (
          <>            
          </>
        )
      }
    ];

    const datap = [];

    for (let i = 1; i < 13; ++i) {
      for(let j = 0; j < data.length; ++j){
        if(data[j].mes === columnsD[i].key){
          datap.push({
            elemento: data[j].elemento,
            mes: data[j].ejecutado,
          });
      }      
      }      
    }

    return (
      <Table 
      columns={columnsD}   
      dataSource={datap} 
      pagination={false} />
    )     
  };

  const customTable = () => {  
    const d = [];
    for(let i = 0; i < data.length; ++i){
      if(data.length !== 1){
        for(let j = 0; j < data.length; ++j){
          if(data[j].id !== data[i].id )
          d.push({
            key: data[i].id,
            codigo: "12345",
            proyecto: "Prueba"
          })
        }
      }
      else{
        d.push({
          key: data[i].id,
          codigo: "12345",
          proyecto: "Prueba"
        })
      } 
    }
    
    const customData =
      d.map((gasto) => 
      {
        return {
          key: gasto.id,
          codigo: gasto.codigo,
          proyecto: gasto.nombre,
        };
      }) || [];

    const columnsData = [
      {
        key: 'codigo',
        dataIndex: 'codigo',
        title: 'Código',
        align: 'center',
        width: '70%'
      },
      {
        key: 'proyecto',
        dataIndex: 'proyecto',
        title: 'Proyecto',      
        width: '70%'
      }      
    ];

    return (
      <Table
        className="components-table-demo-nested"
        dataSource={customData}
        columns={columnsData}
        expandable={{
          expandedRowRender
        }}
        scroll={{columnsData, x: 130, y: 1800}} 
        pagination={{ defaultPageSize: 5, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
      />
    );
  };

  const addButton = () => {
    const modalProperties = { title: 'Crear Gasto!', className: 'custom-modal' };
    const buttonProperties = {
      caption: 'Adicionar Gastos',
      type: 'primary',
      className: 'action-button',
      icon: <PlusOutlined />
    };

    const handleOk = () => {
      submitButtonRef.current.click();
    };

    return (
      <CustomModal
        className="components-table-demo-nested"
        modalProperties={modalProperties}
        buttonProperties={buttonProperties}
        component={<AddForm useData={[data, setData]} submitButtonRef={submitButtonRef} />}
        handleOK={handleOk}
      />
    );
  };

  return (
    <Layout className="gastoPage">
      <Content>
        <Row align="middle" className="gastoPage__mainContainer">
          <Form name="normal_login" className="gastoForm" initialValues={{ remember: true }}>
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

export default Gastos;