import { getAxios } from 'utils/axios';

export const createProblems = async (nombre, descripcion, creadoPor) => {
  const endpoint = `/problem/create`;
  const problem = {
    nombre: nombre,
    descripcion: descripcion,
    userId: creadoPor
  };

  const { data } = await getAxios().post(endpoint, problem);
  return data;
};

export const deleteProblems = async (id) => {
  try {
    const endpoint = `problem/delete?id=${id}`;
    const { data } = await getAxios().delete(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllProblems = async () => {
  try {
    const endpoint = `/problems`;
    const { data } = await getAxios().get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllProblemsByUO = async (uo) => {
  try {
    const endpoint = `/problems?uo=${uo}`;
    const { data } = await getAxios().get(endpoint);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const changeProblemStatus = async (id, estado) => {
  try {
    const endpoint = `/problem-status/?id=${id}&estado=${estado}`;
    const { data } = await getAxios().get(endpoint);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProblemById = async (id) => {
  // try {
  //   const localStorageData = storage.getUser();
  //   axios.defaults.headers.common['Content-Type'] = 'application/json';
  //   axios.defaults.headers.common['Accept-Language'] = localStorageData?.language || 'en';
  //   //axios.defaults.headers.common['access-token'] = token;
  //   // const endpoint = `${url}/appointment?id=${id}`;
  //   // const data = await axios.get(endpoint);
  //   const data = problemas.find((p) => p.id === id);
  //   return data;
  // } catch (error) {
  //   throw error;
  // }
};
