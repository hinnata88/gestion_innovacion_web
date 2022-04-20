import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ auth, component: Component, roles, ...rest }) => {
  try {
    const rolesIds = roles
      .map((p) => {
        const role = auth.roles?.find((r) => r.nombre === p);
        return role?.id || null;
      })
      .filter((f) => f);
    const userRolId = auth.getUserRol();

    // auth.getRolIdFromRolName(
    return <Route {...rest}>{auth.isLogIn() && rolesIds.includes(userRolId) ? <Component /> : <Redirect to="/login" />}</Route>;
  } catch (error) {
    console.log(error);
  }
};

export default PrivateRoute;
