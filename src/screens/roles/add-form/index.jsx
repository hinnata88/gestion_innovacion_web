import React from 'react';
import { Form, Row, Button, Input } from 'antd';

import { createProblems } from 'api/problemsServices';

import { CustomPopup } from 'components';
import useAuth from 'auth/useAuth';

import '../styles.scss';

const AddForm = ({ useData, submitButtonRef }) => {
  const auth = useAuth();
  const [data, setData] = useData;

  const add = async (values) => {
    const { nombre, descripcion } = values;
    const userData = auth?.user?.data;

    const res = await createProblems(nombre, descripcion, userData.id);
    if (res.statusCode === 200) {
      CustomPopup('success', res.message);
      const problems = [...data, res.response];
      setData(problems);
    } else CustomPopup('error', res.message);

    form.resetFields();
  };

  const [form] = Form.useForm();

  return (
    <Form form={form} name="problem_form" className="problemForm" onFinish={add} initialValues={{ description: null }}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        <Form.Item label={'Nombre'} name="nombre" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'Descripción'} name="descripcion" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Input />
        </Form.Item>
      </Row>
      <Form.Item>
        <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
