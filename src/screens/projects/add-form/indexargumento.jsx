import React, { useState } from 'react';
import { Form, Row, Button, Input } from 'antd';

import { createJustification } from 'api/justificationServices';

import { CustomPopup } from 'components';

import '../styles.scss';

const AddArgument = ({useData, proyect, submitButtonRefOtro }) => {
  const [setDataArgument] = useState();
  //const [data, setData] = useData;
  const {TextArea} = Input;
  const newDate = new Date();
  const projectId = proyect[0].key;

  const add = async (values) => {
    const value = {...values, fecha: newDate, proyectoId: projectId}
    const { fecha, justificacion, montoSolicitado, proyectoId } = value;
    // eslint-disable-next-line no-const-assign

    const res = await createJustification(fecha, justificacion, montoSolicitado, proyectoId);
    if (res.statusCode === 200) {
      CustomPopup('success', 'Argumento creado correctamente');
      const justificacionFinal = res.response;
      if(justificacionFinal.estado !== "PENDIENTE")
      CustomPopup('success', "El cambio en el presupuesto fue aprobado")
      //let final = [...dataArgument, justificacionFinal]
      /*let presupuesto = proyect[0].presupuesto_aprobado;
      for(let j = 0; j < data.length; ++j){
        if(justificacionFinal.estado === "PENDIENTE" && data[j].id === projectId) {
          data[j].totalAprobado = presupuesto + justificacionFinal.montoSolicitado
          setData(data);
          return false;
        }*/
        else CustomPopup('error', "El cambio en el presupuesto no fue aprobado");
        setDataArgument(justificacionFinal);
      } 
      else CustomPopup('error', res.message);
    form.resetFields();
  };

  const [form] = Form.useForm();
  const letras = new RegExp("^[a-zA-Z ]{4,200}$");

  return (
    <Form form={form} name="justificacion_form" className="projectForm" onFinish={add} initialValues={{ description: null }}>
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item label={'Monto Solicitado'} name="montoSolicitado" 
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
          }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label={'Justificacion'} 
          name="justificacion" 
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
          <TextArea rows={4} maxLength={200} />
        </Form.Item>        
      </Row>
      <Form.Item>
        <Button ref={submitButtonRefOtro} type="hidden" htmlType="submit" style={{ display: 'flex' }} />
      </Form.Item>
    </Form>
  );
};

export default AddArgument;
