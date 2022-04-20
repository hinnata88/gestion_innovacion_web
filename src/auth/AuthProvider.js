import { createContext, useEffect, useState } from 'react';
import * as storage from '../common/storage';
import { getAllRoles } from 'api/roleServices';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const loadRoles = async () => {
    const { response } = await getAllRoles();
    setRoles(response);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const logIn = (userData) => {
    const userObj = {
      data: userData,
      language: userData.language
    };
    setUser(userObj);
    storage.setUser({ username: userData.user.nombreUsuario, role: userData.user.rolId, language: userData.language });
  };

  const logOut = () => {
    const blankUser = {
      username: '',
      role: '',
      language: 'es-US'
    };
    storage.setUser(blankUser);
    setUser(null);
  };

  const isLogIn = () => {
    return user ? true : null;
  };

  const getUserRol = () => {
    return user?.data.user.rolId || null;
  };

  const getUserName = () => {
    if (user) {
      return !user.data.user.nombreUsuario ? null : user.data.user.nombreUsuario;
    }
  };

  const getUser = () => {
    return user;
  };

  const getRolIdFromRolName = (name) => {
    return roles?.find((r) => r.nombre === name).id || null;
  };

  const contextValue = {
    user: user,
    roles: roles,
    logIn,
    logOut,
    isLogIn,
    getUserRol,
    getUserName,
    getUser,
    getRolIdFromRolName
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
