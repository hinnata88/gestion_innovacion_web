import { getAxios } from 'utils/axios';
import { roles } from 'data/mookData';

export const getAllRoles = async () => {
  try {
    const endpoint = `/roles`;
    const { data } = await getAxios().get(endpoint);

    if (data.statusCode === 200) {
      const customRoles = data.response.map((p) => {
        const mapRole = roles.find((r) => r.nombre === p.nombre);
        return { ...mapRole, descripcion: p.descripcion, id: p.id, createdAt: p.createdAt };
      });
      return { statusCode: data.statusCode, response: customRoles };
    }

    return data;
  } catch (error) {
    throw error;
  }
};
