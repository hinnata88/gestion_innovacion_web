// import bcrypt from 'bcryptjs';
import { getAxios } from 'utils/axios';

export const loginUser = async (username, password) => {
  const endpoint = `/user/login`;

  const user = {
    username: username,
    password: password
  };

  const { data } = await getAxios().post(endpoint, user);
  return data;
};

export const registerUser = async (name, lastName, position, role, email, uo) => {
  const endpoint = `/user/register`;

  const user = {
    email: email,
    confirmado: false,
    uo: uo,
    rolId: role,
    persona: {
      nombre: name,
      apellido: lastName,
      cargo: position
    }
  };
  const { data } = await getAxios().post(endpoint, user);
  return data;
};

export const confirmUser = async (token) => {
  // const localStorageData = storage.getUser();
  // axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
  // const endpoint = `${url}/user/confirm`;
  // const user = {
  //   token: token
  // };
  // const data = await axios.post(endpoint, user);
  // return data;
};

export const getUsers = async () => {
   try {
    const endpoint = '/users'
     //const localStorageData = Storage.getUser();
     //getAxios().defaults.headers.common['Content-Type'] = 'application/json';
     //getAxios().defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
     //axios.defaults.headers.common['access-token'] = token;
      //const endpoint = `${url}/users`;
      const {data} = await getAxios().get(endpoint);
     //const data = usuarios;
     return data;
   } catch (error) {
     throw error;
   }
};

export const getUserById = async (id) => {
  // try {
  //   const localStorageData = storage.getUser();
  //   axios.defaults.headers.common['Content-Type'] = 'application/json';
  //   axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
  //   // const endpoint = `${url}/user?id=${id}`;
  //   // const data = await axios.get(endpoint);
  //   const data = usuarios.find((p) => p.id === id);
  //   return data;
  // } catch (error) {
  //   throw error;
  // }
};

export const getUserByUsername = async (username) => {
  // try {
  //   const localStorageData = storage.getUser();
  //   axios.defaults.headers.common['Content-Type'] = 'application/json';
  //   axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
  //   // const endpoint = `${url}/user?username=${username}`;
  //   // const data = await axios.get(endpoint);
  //   const data = usuarios.find((p) => p.nombreUsuario === username);
  //   return data;
  // } catch (error) {
  //   throw error;
  // }
};

export const getUserByToken = async (token) => {
  try {
    const endpoint = `/user?token=${token}`;
    return await getAxios().get(endpoint);
  } catch (error) {
    throw error;
  }
};

export const disableUser = async (id) => {
  // try {
  //   const localStorageData = storage.getUser();
  //   axios.defaults.headers.common['Content-Type'] = 'application/json';
  //   axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
  //   // axios.defaults.headers.common['access-token'] = token;
  //   const endpoint = `${url}/user/delete?id=${id}`;
  //   const data = await axios.delete(endpoint);
  //   return data;
  // } catch (error) {
  //   throw error;
  // }
};

export const changeUserPassword = async (id, newPassword) => {
  // const localStorageData = storage.getUser();
  // axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
  // const endpoint = `${url}/user/password`;
  // const userData = {
  //   id: id,
  //   newPassword: newPassword
  // };
  // const data = await axios.post(endpoint, userData);
  // return data;
};

export const changePasswordAndConfirm = async (id, token, newPassword) => {
  const endpoint = `/user/confirm-register`;
  const userData = {
    id: id,
    token: token,
    newPassword: newPassword
  };
  return await getAxios().post(endpoint, userData);
};
