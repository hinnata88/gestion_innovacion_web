import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from 'common/storage';
import { roles } from 'data/mookData';

const PrivateRoute = ({ children, restricted, ...rest }) => {
  return children ? (
    <Route
      {...rest}
      render={({ location }) => {
        const user = getUser();

        if (Boolean(user)) {
          if (restricted && user?.roles[0].name !== roles[0].id && user?.roles[0].name !== roles[1].id) {
            return <Redirect to={{ pathname: '/restricted', state: { from: location } }} />;
          }

          return children;
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
        }
      }}
    />
  ) : null;
};

export default PrivateRoute;
