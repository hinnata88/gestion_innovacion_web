// import React, { useState, useEffect } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// import { Form, Input, Layout, Row, DatePicker, Space, Table, PageHeader, Button, Descriptions, Modal } from 'antd';
// import {
//   LockOutlined,
//   SmileOutlined,
//   CloseCircleOutlined,
//   UserOutlined,
//   PlusCircleOutlined,
//   FileSearchOutlined,
//   PlusCircleFilled,
//   FileSearchFilled
// } from '@ant-design/icons';

// import { deleteAppointment, createAppointment, getAppointmentById, getAllAppointments } from '../../../api/appointmentServices';
// import { getUserByUsername } from '../../../api/userServices';

// import { BaseLayout, CustomButton, CustomPopup, CustomActionForm } from '../../../components';

// import * as storage from '../../../common/storage';

// import moment from 'moment';

// import './styles.scss';

// const { TextArea } = Input;
// const { Content } = Layout;

// const Patient = () => {
//   const [userPatient, setUserPatient] = useState();
//   const [showData, setShowSata] = useState(true);
//   const history = useHistory();
//   const [language] = useTranslations();
//   const { getValue } = language;

//   useEffect(() => {
//     const fillUserData = async (username) => {
//       const listAppointment = await getUserByUsername(username);
//       const { data } = listAppointment;
//       setUserPatient(data.response);
//     };
//     if (storage?.getUser()) {
//       const patientUser = storage.getUser();
//       fillUserData(patientUser.username);
//     } else {
//       history.push('/login');
//     }
//   }, []);

//   const finishCreateAppointmentForm = (values) => {
//     const { descrption } = values;
//   };

//   const createHeaderData = () => {
//     return (
//       <PageHeader
//         ghost={false}
//         title="Appointments"
//         subTitle="List of appointments"
//         extra={[
//           <Button type="text" icon={<PlusCircleOutlined />} onClick={createAppointment}>
//             {' '}
//             New Appointment{' '}
//           </Button>,
//           <Button type="text" icon={<FileSearchOutlined />} onClick={updateAppointmentData}>
//             {' '}
//             Update List{' '}
//           </Button>
//         ]}
//       >
//         <Descriptions size="small" column={2}>
//           <Descriptions.Item label="Patient">{userPatient?.username}</Descriptions.Item>
//           <Descriptions.Item label="Appointments">
//             {' '}
//             <a>{userPatient?.appointments?.length}</a>{' '}
//           </Descriptions.Item>
//         </Descriptions>
//       </PageHeader>
//     );
//   };

//   const createAppointment = () => {
//     <Modal title="New Appointment">
//       <p>testing</p>
//     </Modal>;
//   };

//   const updateAppointmentData = async () => {
//     if (userPatient) {
//       const listAppointment = await getUserByUsername(userPatient.username);
//       const { data } = listAppointment;
//       setUserPatient(data.response);
//       console.log(data.response);
//     }
//   };

//   const listAppointment = () => {
//     if (userPatient) {
//       const { appointments } = userPatient;
//       const appointmentsData = [];

//       appointments.forEach((element, index) => {
//         console.log('indice:', element);
//         const tmpAppointment = {
//           key: index + 1,
//           id: element.id,
//           description: element.description,
//           created: element.createdAt,
//           last_update: element.updatedAt,
//           action: 'NADA'
//         };
//         appointmentsData.push(tmpAppointment);
//       });

//       const appointmentColums = [
//         { title: 'Id', dataIndex: 'id', key: 'id' },
//         { title: 'Description', dataIndex: 'description', key: 'description' },
//         { title: '   Created', dataIndex: 'created', key: 'created' },
//         { title: '   Last Update', dataIndex: 'last_update', key: 'last_update' },
//         { title: '   Action', dataIndex: 'action', key: 'action' }
//       ];

//       return <Table dataSource={appointmentsData} columns={appointmentColums} />;
//     } else {
//       //aqui poner algo de cuando hay datos a mostrar
//     }
//   };

//   const deleteAppointment = () => {};

//   const patientScreen = () => {
//     return (
//       <Layout className="confirmPage bg-gradient-chill">
//         <Content>
//           <Row align="middle" className="confirmPage__mainContainer">
//             {createHeaderData()}
//             {listAppointment()}
//           </Row>
//         </Content>
//       </Layout>
//     );
//   };

//   return <BaseLayout component={patientScreen} />;
// };

// export default Patient;
