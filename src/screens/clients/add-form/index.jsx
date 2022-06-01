/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Form, Switch, Button, Input, Select } from 'antd';

import { createClient } from 'api/clientServices';
//import { validate } from 'class-validator';
//import { CreateItemDto } from "./CreateItemDto";
// import { getAllProblemsByUO, getAllProblems } from 'api/problemsServices';

import { CustomPopup } from 'components';
// import useAuth from 'auth/useAuth';

import { unidadOrganizativa } from 'data/mookData';

import '../styles.scss';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const AddForm = ({ useData, submitButtonRef }) => {
  // const auth = useAuth();
  const [data, setData] = useData;
  const [form] = Form.useForm();
  

  const [internClient, setInternClient] = useState(false);

  // const userData = auth?.user?.data?.user;

  const add = async (values) => {
    // const { nombre, uo, codigo_uo, codigo_reup, no_contrato, organismo } = values;

    const client = values;

    const res = await createClient(client);
    if (res.statusCode === 200) {
      CustomPopup('success', 'Cliente creado correctamente');
      const problems = [...data, res.response];
      setData(problems);
    } else CustomPopup('error', res.message);

    form.resetFields();
  };

  const letras = new RegExp("^[a-zA-Z ]{4,40}$");

  const InternClient = () => {
    return (
      <>
        <Form.Item label={'Unidad Organizativa'} name="uo" rules={[{ required: true, message: 'Campo Obligatorio' }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder={'Escoger Unidad Organizativa'}>
            {unidadOrganizativa.map((p) => {
              return (
                <Option key={p.id} value={p.id}>
                  {p.nombre}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={'Código'} name="codigo_uo" 
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
            pattern: /[0-9]{3}/,
            message: 'El campo solo debe tener números'
          },
          {
            max: 3,
            message: 'El campo solo debe tener un tamaño de 3 caracteres'
          }
          ]}
          hasFeedback
        >
          <Input/>
        </Form.Item>
      </>
    );
  };

  const ExternClient = () => {
    return (
      <>
        <Form.Item label={'Codigo REUP'} name="codigo_reup" 
        rules={[
          { 
          required: true, 
          message: 'Campo obligatorio' 
          },
          {
            pattern: /[0-9]{5}/,
            message: 'El campo solo debe tener números'
          },
          {
            whitespace: true,
            message: 'El campo no puede estar vacío'
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
        <Form.Item label={'Número de Contrato'} name="no_contrato" 
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
            pattern: /[a-zA-Z0-9]{15}/,
            message: 'El campo solo debe tener letras y números'
          },
          {
            max: 15,
            message: 'El campo solo debe tener un tamaño de 15 caracteres'
          }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item label={'Organismo'} name="organismo" 
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
      </>
    );
  };

  const switchChange = (checked) => {
    setInternClient(checked);
  };

  return (
    <Form {...layout} form={form} onFinish={add} size={'default'}>
      <Form.Item label={'Nombre'} name="nombre" 
        rules={[
          { 
          required: true, 
          message: 'Campo obligatorio' 
          },
          {
            whitespace: true,
            message: 'El campo no puede estar vacio'
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
      <Form.Item label={`Tipo de Cliente:`}>
        <Switch onChange={switchChange} checkedChildren={'Interno'} unCheckedChildren={'Externo'} />
      </Form.Item>
      {internClient ? InternClient() : ExternClient()}
      <Form.Item>
        <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
