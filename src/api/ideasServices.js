import { getAxios } from 'utils/axios';

export const createIdea = async (nombre, descripcion, problema, idUsuario, id) => {
  const endpoint = `/idea/create`;
  const problem = {
    nombre: nombre,
    descripcion: descripcion,
    id: problema,
    userId: idUsuario
  };

  const { data } = await getAxios().post(endpoint, problem);
  return data;
};

export const deleteIdea = async (id) => {
  try {
    const endpoint = `idea/delete?id=${id}`;
    const { data } = await getAxios().delete(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllIdeas = async () => {
  try {
    const endpoint = `/ideas`;
    const { data } = await getAxios().get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllIdeasByFilter = async ({ id, uo }) => {
  try {
    var endpoint = null;
    if (id) endpoint = `/ideas-filter?problemId=${id}`;
    if (uo) endpoint = `/ideas-filter?uo=${uo}`;

    console.log(id, uo);

    const { data } = await getAxios().get(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};

export const changeIdeaStatus = async (id, estado) => {
  try {
    const endpoint = `/idea-status/?id=${id}&estado=${estado}`;
    const { data } = await getAxios().get(endpoint);
    return data;
  } catch (error) {
    throw error;
  }
};
