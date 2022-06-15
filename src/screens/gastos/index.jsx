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
//const { Text } = Typography;

export const Gastos = () => {
  const submitButtonRef = useRef();
  //const auth = useAuth();
  const [data, setData] = useState([]);
  const [datag, setDataG] = useState([]);
  const datap = [];
  const d = [];
  
  const loadGastos = async () => {
    const storageData = storage.getUser();
    if (storageData.username) {
      //const userUO = auth.user?.data.user.uo || 0;
      const responseData = await getAllBudget();

      const { statusCode, response, message } = responseData;
      if (statusCode === 200){
        setData(response)        
      }
      else CustomPopup('error', message);
    }
  };

  useEffect(() => {
    loadGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expandedRowRender = () => {
    
    let totalP = 0;

    const columnsD = [
      {
        key: 'elemento',
        dataIndex: 'elemento',
        title: 'Elemento Gastos',
        fixed: 'left',
        width: 310
      },
      { title: 'Ene', dataIndex: 'ene', key: 1 },
      { title: 'Feb', dataIndex: 'feb', key: 2 },
      { title: 'Mar', dataIndex: 'mar', key: 3 },
      { title: 'Abr', dataIndex: 'abr', key: 4 },
      { title: 'May', dataIndex: 'may', key: 5 },
      { title: 'Jun', dataIndex: 'jun', key: 6 },
      { title: 'Jul', dataIndex: 'jul', key: 7 },
      { title: 'Ago', dataIndex: 'ago', key: 8 },
      { title: 'Sep', dataIndex: 'sep', key: 9 },
      { title: 'Oct', dataIndex: 'oct', key: 10 },
      { title: 'Nov', dataIndex: 'nov', key: 11 },
      { title: 'Dic', dataIndex: 'dic', key: 12 },
      {
        key: 'total',
        dataIndex: 'total',
        title: 'Total',
        fixed: 'right',
        width: 100,
        align: 'center'
      }
    ];  
    
    if(datag.length > 0){
      for (let i = 0; i < datag.length; ++i) {
        for(let j = 1; j < 13; ++j){
          if(datag[i].mes === columnsD[j].key){
            totalP += datag[i].ejecutado
            datap.push({
              key: datag[i].key,
              elemento: datag[i].elemento,
              [columnsD[j].dataIndex]: datag[i].ejecutado,
              total: totalP
            });
        }      
        }      
      }
    }
    else if(datap.length > 0){
      for (let i = 0; i < datap.length; ++i) {
        for(let r = 0; r < data.length; ++r){
          if(datap[i].id !== data[r].key){
            for(let j = 1; j < 13; ++j){
              if(data[i].mes === columnsD[j].key){
                totalP += datap[j].ejecutado
                datap.push({
                  key: data[i].id,
                  elemento: data[i].elemento,
                  [columnsD[j].dataIndex]: data[i].ejecutado,
                  total: totalP
                });
            }      
            }
          }
        }              
      }
    } 
    else {
      for(let i = 0; i < data.length; ++i){
          for(let j = 1; j < 13; ++j){
            if(data[i].mes === columnsD[j].key){
              totalP = data[i].ejecutado
              datap.push({
                key: data[i].id,
                elemento: data[i].elemento,
                [columnsD[j].dataIndex]: data[i].ejecutado,
                total: totalP
              });
          }      
          }
      }
    }     

    return (
    <Table 
      columns={columnsD}   
      dataSource={datap} 
      scroll={{
        x: 1500,
        y: 300,
      }}
      pagination={false} />
    )     
  };

  const customTable = () => {
    if(datag.length > 0){
    for(let i = 0; i < data.length; ++i){
      if(data.length > 0 && data[i].id !== datag.key){
          d.push({
            id: i,
            codigo: 1+i,
            proyecto: "Prueba"
          })
        }
      else{
        d.push({
          id: i,
          codigo: 1+i,
          proyecto: "Prueba"
        })
      } 
    }}
    else if(d.length > 0){
      for(let i = 0; i < data.length; ++i){
        if(data.length > 0 && data[i].id !== d.id){
            d.push({
              id: i,
              codigo: 1+i,
              proyecto: "Prueba"
            })
          }
        else{
          d.push({
            id: i,
            codigo: 1+i,
            proyecto: "Prueba"
          })
        } 
      }}
    else{
      for(let i = 0; i < data.length; ++i){
        d.push({
          id: i,
          codigo: 1+i,
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
          proyecto: gasto.proyecto,
        };
      }) || [];

    const columnsData = [
      {
        key: 'codigo',
        dataIndex: 'codigo',
        title: 'Código',
        align: 'center',
        fixed: 'left',
        width: 100
      },
      {
        key: 'proyecto',
        dataIndex: 'proyecto',
        title: 'Proyecto', 
        fixed: 'right',     
        width: 100
      }      
    ];

    return (
      <Table
        className="components-table-demo-nested"        
        columns={columnsData}
        expandable={{
          expandedRowRender
        }}
        scroll={{
          x: 500
        }} 
        dataSource={customData}
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
        component={<AddForm useData={[datag, setDataG]} submitButtonRef={submitButtonRef} />}
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