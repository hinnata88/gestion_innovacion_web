import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from 'auth/useAuth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={(props) => (auth.isLogIn() ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const auth = useAuth();
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => (auth.isLogIn() && restricted ? <Redirect to="/dashboard" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;
