import { getAxios } from 'utils/axios';

export const createProyect = async (nombre, descripcion, uo, codigo, totalAprobado, clienteId, ideaID) => {
  const endpoint = `/proyecto/create`;
  const proy = {
    nombre: nombre,
    descripcion: descripcion,
    uo: uo,
    codigo: codigo,
    totalAprobado: totalAprobado,
    clienteId: clienteId,
    ideaID: ideaID
  };

  const { data } = await getAxios().post(endpoint, proy);
  return data;
};

export const getAllProyects = async () => {
  try {
    const endpoint = `/proyectos`;
    const { data } = await getAxios().get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllProjectsByUO = async (uo) => {
  try {
    const endpoint = `/proyectos?uo=${uo}`;
    const { data } = await getAxios().get(endpoint);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};