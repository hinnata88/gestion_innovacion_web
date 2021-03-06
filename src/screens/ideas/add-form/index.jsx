import React, { useEffect, useState } from 'react';
import { Form, Row, Button, Input, Select} from 'antd';

import { createIdea } from 'api/ideasServices';
import { getAllProblemsByUO, getAllProblems } from 'api/problemsServices';
//import { getAllIdeas, getAllIdeasByFilter } from 'api/ideasServices';

import { CustomPopup } from 'components';
import useAuth from 'auth/useAuth';

import '../styles.scss';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddForm = ({ useData, submitButtonRef }) => {
  const auth = useAuth();
  const [data, setData] = useData;

  const {TextArea} = Input;

  const [problemsToPick, setProblemsToPick] = useState([]);
  const [problems, setProblems] = useState([]);

  const userData = auth?.user?.data?.user;

  useEffect(() => {
    const getProblems = async () => {
      const { statusCode, response, message } = userData?.uo ? await getAllProblemsByUO(userData.uo) : await getAllProblems();
      statusCode === 200 ? setProblemsToPick(response) : CustomPopup('error', `ERROR: ${message}`);
    };
    getProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const result = problemsToPick.filter((problem) => problem.estado === 'APROBADO');
    setProblems(result);
  }, [problemsToPick]);
  

  async function add(values) {
    if(values?.id !== undefined || values?.id !== null){
      const { nombre, descripcion, problema, id } = values;

    const res = await createIdea(nombre, descripcion, problema, userData.id, id);
    if (res.statusCode === 200) {
      CustomPopup('success', 'Idea creada correctamente');
      const ideas = res.response;
      const idea = {          
            id: ideas.createdIdea.id,
            nombre: ideas.createdIdea.nombre,
            descripcion: ideas.createdIdea.descripcion || 'Sin descripción',
            estado: ideas.createdIdea.estado,
            problemas: ideas.problems.map((p) => p.nombre + " " ),
            createdAt: ideas.createdIdea.createdAt
        };
      const final = [...data, idea];
      setData(final);
      
    } else CustomPopup('error', res.message);
    }  
    else CustomPopup('error', 'No se ha podido crear la idea');  
    form.resetFields();
  };

  const [form] = Form.useForm();
  const letras = new RegExp("^[a-zA-Z ]{4,200}$");

  return (
    <Form form={form} name="problem_form" className="problemForm" onFinish={add} initialValues={{ description: null }}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item label={'Problemas'} name="problema" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Escoger problemas" mode="multiple">
            {problems.map((p) => {
              return (
                <Option key={p.id} value={p.id}>
                  <div className="demo-option-label-item">{p.nombre}</div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={'Nombre'} name="nombre" 
        rules={[
          { 
          required: true, 
          message: 'Campo obligatorio' 
          },
          {
            whitespace: true,
            message: 'El campo no puede estar vacío'
          },
          {
            validator: (_, value) =>
            value && letras.test(value)
            ? Promise.resolve()
            : Promise.reject("El campo solo debe tener letras")
          }
          ]}
          hasFeedbackrules
        >
          <Input />
        </Form.Item>
        <Form.Item label={'Descripción'} name="descripcion" 
        rules={[
          { 
          required: true, 
          message: 'Campo obligatorio' 
          },
          {
            whitespace: true,
            message: 'El campo no puede estar vacío'
          },
          {
            validator: (_, value) =>
            value && letras.test(value)
            ? Promise.resolve()
            : Promise.reject("El campo solo debe tener letras")
          }
          ]}
          hasFeedback
        >
        <TextArea rows={4} maxLength={200} />
        </Form.Item>        
      </Row>
      <Form.Item>
        <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
