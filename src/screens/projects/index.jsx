import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, Layout, Row, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//import { DateTime } from 'luxon';

import * as storage from 'common/storage';
import useAuth from 'auth/useAuth';

import { CustomPopup, CustomModal } from 'components';
import { getAllProjectsByUO } from 'api/projectServices';
import { getAllProblemsByIDIdea } from 'api/problemsServices';
//import { getAllJustification } from 'api/justificationServices';

import AddForm from './add-form/index';
import AddArgument from './add-form/indexargumento';

import './styles.scss';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

export const Projects = () => {
  const submitButtonRef = useRef();
  const submitButtonRefOtro = useRef();
  //const date = new Date();
  
  const auth = useAuth();
  let history = useHistory(); 

  const [data, setData] = useState([]);
  //const [dataArgument, setDataArgument] = useState();

  const loadProjects = async () => {
    const storageData = storage.getUser();
    console.log("storageData"+ storageData.nombre);

    if (storageData.username) {
      const userUO = auth.user?.data.user.uo || 0;
      const responseData = await getAllProjectsByUO(userUO);

      const { statusCode, response, message } = responseData;
      if (statusCode === 200) setData(response);
      else CustomPopup('error', message);
    }
  };

  /*const loadJustification = async () => {
    const responseData = await getAllJustification();

    const { statusCode, response, message } = responseData;
    if (statusCode === 200) setDataArgument(response);
    else CustomPopup('error', message);
  }*/

  useEffect(() => {
    loadProjects();
    //datosJustificacion();
    //loadJustification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*const datosJustificacion = async () => {
    const object = {
      fecha: new Date(),
      justificacion: "",
      montoSolicitado: "",
      proyectoId: data.key
    }
    setDataArgument(object);
  }*/ 

  const getProblema = async (id) =>{ 
    let result = "";
    /*for(let j = 0; j < customData.length; ++j){
      let pp = await getAllProblemsByIDIdea(customData[j].key);
      if(pp.statusCode === 200 && pp.response[0] !== undefined){
        customData[j].problema = pp.response[0].nombre;  
      }
      else CustomPopup('error', "Prueba");
    }*/
    const p = await getAllProblemsByIDIdea(id);
    if(p.statusCode === 200 && p.response[0] !== undefined){
      result = p.response[0].nombre;
    }
    return result;
  };

  const customTable = () => {
    const customData =
      data.map((project) => {     
        return {
          key: project.id,
          codigo: project.codigo,
          nombre: project.nombre,
          descripcion: project.descripcion,
          uo: auth.user?.data.user.uo || 0,
          jproyecto: auth.user?.data.user.nombreUsuario,
          especialistas: project.especialistas,
          problema: getProblema(project.id),
          presupuesto_aprobado: project.totalAprobado,
          presupuesto_ejecutado: project.totalEjecutado || 0
        };
      })|| [];

    const modalProperties = { title: 'Crear Modificación Presupuesto!', className: 'custom-modal' };
    const buttonProperties = {
      type: 'primary',
      className: 'action-button',
      icon: <PlusOutlined />
    };

    const handleOkModal = () => {
      submitButtonRefOtro.current.click();
    }; 

    const columnsData = [
      {
        key: 'codigo',
        dataIndex: 'codigo',
        title: 'Código',
        width: '10%'
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
        key: 'jproyecto',
        dataIndex: 'jproyecto',
        title: 'Jefe Proyecto',
        align: 'center',
        width: '20%'
      },
      {
        key: 'especialistas',
        dataIndex: 'especialistas',
        title: 'Especialistas',
        align: 'center',
        width: '20%'
      },
      {
        key: 'problema',
        dataIndex: 'problema',
        title: 'Problema',
        align: 'center',
        width: '20%'
      },
      {
        key: 'presupuesto_aprobado',
        dataIndex: 'presupuesto_aprobado',
        title: 'Presupuesto Aprobado',
        align: 'center',
        width: '10%'
      },
      {
        key: 'presupuesto_ejecutado',
        dataIndex: 'presupuesto_ejecutado',
        title: 'Presupuesto Ejecutado',
        width: '10%'
      },
      {
        key: 'argumento',
        dataIndex: 'argumento',
        title: 'Argumento',
        width: '10%',
        align: 'center',
        render: (_, record) => (
          <>
            <CustomModal
              modalProperties={modalProperties}
              buttonProperties={buttonProperties}
              component={<AddArgument proyect={[record]} useData={[data, setData]} submitButtonRefOtro={submitButtonRefOtro}/>}
              handleOK={handleOkModal}
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
    const modalProperties = { title: 'Crear Proyecto!', className: 'custom-modal' };
    const buttonProperties = {
      caption: 'Adicionar Proyecto',
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
    <Layout className="projectPage">
      <Content>
        <Row align="middle" className="projectPage__mainContainer">
          <Form name="normal_login" className="projectForm" initialValues={{ remember: true }}>
            <Row>
              <Col>
                {' '}
                <div>{addButton()}</div>
              </Col>
              <Col>
                {' '}
                <Button
                  type="primary"
                  className="action-button"
                  title="Planificación de Gastos"
                  icon={<PlusOutlined />}
                  onClick={() => history.push({ pathname: '/gastos' })}
                >
                  Planificación de Gastos
                </Button>
              </Col>
            </Row>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>{customTable()}</Row>
          </Form>
        </Row>
      </Content>
    </Layout>
  );
};

export default Projects;
