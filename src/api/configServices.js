import * as storage from '../common/storage';
const axios = require('axios');

const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export const createConfiguration = async (email_contact, email_register, email_appointment) => {
  const localStorageData = storage.getUser();
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';

  const endpoint = `${url}/configuration/create`;

  const config = {
    email_contact: email_contact,
    email_register: email_register,
    email_appointment: email_appointment
  };
  const data = await axios.post(endpoint, config);
  return data;
};

export const deleteConfiguration = async (id) => {
  try {
    const localStorageData = storage.getUser();
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
    // axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/configuration/delete?id=${id}`;
    const data = await axios.delete(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllConfigurations = async () => {
  try {
    const localStorageData = storage.getUser();
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
    //axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/configurations`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getConfigurationById = async (id) => {
  try {
    const localStorageData = storage.getUser();
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
    //axios.defaults.headers.common['access-token'] = token;

    const endpoint = `${url}/configuration?id=${id}`;
    const data = await axios.get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};
