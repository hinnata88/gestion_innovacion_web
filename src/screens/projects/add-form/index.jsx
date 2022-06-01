import React, { useEffect, useState } from 'react';
import { Form, Row, Button, Input, Select } from 'antd';

import { createProyect } from 'api/projectServices';
import { getAllClients } from 'api/clientServices';
import { getAllIdeasByFilter, getAllIdeas } from 'api/ideasServices';

import { CustomPopup } from 'components';
import useAuth from 'auth/useAuth';

import '../styles.scss';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddForm = ({ problemId, useData, submitButtonRef }) => {
  const auth = useAuth();
  const [data, setData] = useData;
  const {TextArea} = Input;

  const [clients, setClients] = useState([]);
  const [ideasToPick, setIdeasToPick] = useState([]);

  const userData = auth?.user?.data?.user;

  const add = async (values) => {
    const { nombre, descripcion, codigo, totalAprobado, ideaID} = values;
    const userData = auth?.user?.data?.user;

    const res = await createProyect(nombre, descripcion, userData.uo, codigo, totalAprobado, userData.id, ideaID );
    if (res.statusCode === 200) {
      CustomPopup('success', 'Proyecto creado correctamente');
      const project =[...data, res.response] ;
      setData(project);      
    } else CustomPopup('error', res.message);

    form.resetFields();
  };

  useEffect(() => {
    const getIdeas = async () => {
      const { statusCode, response, message } = userData?.uo ? await getAllIdeasByFilter({ id: problemId, uo: userData.uo }) : await getAllIdeas();
      statusCode === 200 ? setIdeasToPick(response) : CustomPopup('error', `ERROR: ${message}`);
    };
    getIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getClients = async () => {
      const { statusCode, response, message } = await getAllClients();
      statusCode === 200 ? setClients(response) : CustomPopup('error', `ERROR: ${message}`);
    };
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form] = Form.useForm();
  const letras = new RegExp("^[a-zA-Z ]{4,200}$");

  return (
    <Form form={form} name="problem_form" className="problemForm"  onFinish={add} initialValues={{ description: null }}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        <Form.Item label={'Código'} name="codigo" 
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
            pattern: /[0-9]{5}/,
            message: 'El campo solo debe tener números'
          },
          {
            max: 5,
            message: 'El campo solo debe tener un tamaño de 5 caracteres'
          }
          ]}
          hasFeedback
        >
          <Input />
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
          hasFeedback
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
        <Form.Item label={'Especialistas'} name="especialistas" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Escoger problemas" mode='multiple'>
            {clients.map((c) => {
              return (
                <Option key={c.id} value={c.id}>
                  <div className="demo-option-label-item">{c.nombre}</div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={'Ideas'} name="ideaID" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Escoger problemas">
            {ideasToPick.map((i) => {
              return (
                <Option key={i.id} value={i.id}>
                  <div className="demo-option-label-item">{i.nombre}</div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={'Presupuesto Aprobado'} name="totalAprobado" 
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
            pattern: /[0-9]/,
            message: 'El campo solo debe tener números'
          }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Row>
      <Form.Item>
        <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'flex' }} />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
