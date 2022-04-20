import { getAxios } from 'utils/axios';

export const getAllRequest = async () => {
  try {
    const endpoint = `/requests`;
    console.log(endpoint);

    const { data } = await getAxios().get(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const approveRequest = async (id) => {
  try {
    const endpoint = `/request/approve?id=${id}`;
    const { data } = await getAxios().get(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deniedRequest = async (id) => {
  try {
    const endpoint = `/request/denied?id=${id}`;
    const { data } = await getAxios().get(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};
