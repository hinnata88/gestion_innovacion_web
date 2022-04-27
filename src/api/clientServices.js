import { getAxios } from 'utils/axios';

export const createClient = async (client) => {
  const endpoint = `/client/create`;
  const { data } = await getAxios().post(endpoint, client);
  return data;
};

export const deleteClient = async (id) => {
  try {
    const endpoint = `client/delete?id=${id}`;
    const { data } = await getAxios().delete(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllClients = async () => {
  try {
    const endpoint = `/clients`;
    const { data } = await getAxios().get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};
