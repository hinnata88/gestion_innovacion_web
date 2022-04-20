import useAuth from 'auth/useAuth';
export const AllowAccessToRequest = (component, user) => {
  const auth = useAuth();
  if (
    user?.data?.user?.rolId === auth.getRolIdFromRolName('Master Admin') ||
    user?.data?.user?.rolId === auth.getRolIdFromRolName('Administrador Aplicacion')
  ) {
    return component;
  }
};
