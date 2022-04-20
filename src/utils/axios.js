import * as storage from 'common/storage';

const axios = require('axios');
const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export const getAxios = () => {
  const localStorageData = storage.getUser();

  const instance = axios.create({
    baseURL: url
  });

  instance.defaults.headers.common['Content-Type'] = 'application/json';
  instance.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'es';

  return instance;
};
