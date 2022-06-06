import React, { useEffect, useState } from 'react';
import { Form, Row, Button, Input, Select } from 'antd';

import { createBudget } from 'api/budgetServices';
import { getAllProjectsByUO, getAllProyects } from 'api/projectServices';

import { CustomPopup } from 'components';
import useAuth from 'auth/useAuth';

import '../styles.scss';
import { UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddForm = ({ useData, submitButtonRef }) => {
  const [setDataG] = useData;
  const auth = useAuth();
  const [problems, setProblems] = useState([]);
  const userData = auth?.user?.data?.user;

  const newDate = new Date();

  useEffect(() => {
    const getProblems = async () => {
      const { statusCode, response, message } = userData?.uo ? await getAllProjectsByUO(userData.uo) : await getAllProyects();
      statusCode === 200 ? setProblems(response) : CustomPopup('error', `ERROR: ${message}`);
    };
    getProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add(values) {
    const value= {...values, mes: newDate.getMonth()+1, anno: newDate.getFullYear()}
    const { mes, anno, elemento, ejecutado, proyectoId } = value;
    // eslint-disable-next-line no-const-assign    

    const res = await createBudget(mes, anno, elemento, ejecutado, proyectoId);
    if (res.statusCode === 200) {
      CustomPopup('success', 'Problema creado correctamente');
      const gastos = res.response;
      const gasto = {    
          key: gastos.id,
          codigo: gastos.proyectoId?.codigo,
          proyecto: gastos.proyectoId?.nombre,
          mes: gastos.mes,
          anno: gastos.año,
          elemento: gastos.elemento,
          ejecutado: gastos.ejecutado
    };
      setDataG(gasto);
    } else CustomPopup('error', res.message);

    form.resetFields();
  };

  const [form] = Form.useForm();

  return (
    <Form form={form} name="gastos_form" className="gastoForm" onFinish={add} initialValues={{ description: null }}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>  
      <Form.Item label={'Proyectos'} name="proyectoId" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Select prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Escoger problemas">
            {problems.map((p) => {
              return (
                <Option key={p.id} value={p.id}>
                  <div className="demo-option-label-item">Código: {p.codigo} - Nombre: {p.nombre}</div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>      
        <Form.Item label={'Elemento'} name="elemento" rules={[{ required: true, message: 'Campo obligatorio' }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'Monto Ejecutado'} name="ejecutado" rules={[{ required: true, message: 'Campo obligatorio' }]}>
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