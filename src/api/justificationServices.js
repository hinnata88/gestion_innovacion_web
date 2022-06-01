import { getAxios } from 'utils/axios';

export const createJustification = async (fecha, justificacion, montoSolicitado, proyectoId) => {
  const endpoint = `/justificacion/create`;
  const problem = {
    fecha: fecha,
    justificacion: justificacion,
    montoSolicitado: montoSolicitado,
    proyectoId: proyectoId
  };

  const { data } = await getAxios().post(endpoint, problem);
  return data;
};

export const getAllJustification = async () => {
  try {
    const endpoint = `/justificacions`;
    const { data } = await getAxios().get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};