import { getAxios } from 'utils/axios';

export const createBudget = async (mes, anno, elemento, ejecutado, proyectoId) => {
  const endpoint = `/presupuesto/create`;
  const problem = {
    mes: mes,
    anno: anno,
    elemento: elemento,
    ejecutado: ejecutado,
    proyectoId: proyectoId
  };

  const { data } = await getAxios().post(endpoint, problem);
  return data;
};

export const getAllBudget = async () => {
  try {
    const endpoint = `/presupuestos`;
    const { data } = await getAxios().get(endpoint);

    return data;
  } catch (error) {
    throw error;
  }
};