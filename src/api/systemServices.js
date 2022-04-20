import * as storage from '../common/storage';
const axios = require('axios');

const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export const sendContactEmail = async (name, email, message) => {
  const localStorageData = storage.getUser();
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';

  const endpoint = `${url}/system/email-contact`;

  const contactData = {
    name: name,
    email: email,
    message: message
  };
  const data = await axios.post(endpoint, contactData);
  return data;
};
