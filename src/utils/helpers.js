import { getAllRoles } from 'api/roleServices';

export const SortBy = (structureToBeOrdered, key, ascending) => {
  if (!structureToBeOrdered) return [];

  let ordered = structureToBeOrdered.sort((a, b) => {
    a = a[key];
    b = b[key];

    return ascending ? (a > b ? 1 : -1) : a < b ? 1 : -1;
  });

  return ordered;
};

export const getRolByName = async (rolName) => {
  const rolBd = await getAllRoles();
  const rolId = rolBd.response.find((r) => r.nombre === rolName);
  return rolId.id;
};
