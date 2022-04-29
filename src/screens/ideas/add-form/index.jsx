import React, { useEffect, useState } from 'react';
import { Form, Row, Button, Input, Select } from 'antd';

import { createIdea } from 'api/ideasServices';
import { getAllProblemsByUO, getAllProblems } from 'api/problemsServices';

import { CustomPopup } from 'components';
import useAuth from 'auth/useAuth';

import '../styles.scss';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddForm = ({ useData, submitButtonRef }) => {
  const auth = useAuth();
  const [data, setData] = useData;

  const [problemsToPick, setProblemsToPick] = useState([]);
  const [problems, setProblems] = useState([]);

  const userData = auth?.user?.data?.user;

  useEffect(() => {
    const getProblems = async () => {
      const { statusCode, response, message } = userData?.uo ? await getAllProblemsByUO(userData.uo) : await getAllProblems();
      statusCode === 200 ? setProblemsToPick(response) : CustomPopup('error', `ERROR: ${message}`);
      console.log("lista " + problemsToPick)      
    };
    getProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(problems)

  useEffect(() => {
    const result = problemsToPick.filter((problem) => problem.estado === "APROBADO")
    setProblems(result);      
    }, [problemsToPick]);

 console.log("prueba " + problemsToPick)

  async function add(values) {
    const { nombre, descripcion, problema } = values;

    const res = await createIdea(nombre, descripcion, userData.id, problema);
    if (res.statusCode === 200) {
      CustomPopup('success', 'Idea creada correctamente');
      const ideas = [...data, res.response];
      setData(ideas);
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
        <Form.Item label={'Problemas'} name="problema" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Escoger problemas">
            {problems.map((p) => {
              return (
                <Option key={p.id} value={p.id}>
                  <div className="demo-option-label-item">{p.nombre}</div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Row>
      <Form.Item>
        <Button ref={submitButtonRef} type="hidden" htmlType="submit" style={{ display: 'none' }} />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
