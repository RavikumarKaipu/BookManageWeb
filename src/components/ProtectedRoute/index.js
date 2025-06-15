import React from 'react';
import { Navigate } from 'react-router-dom';  // Import Navigate for redirection
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
  const jwtToken = Cookies.get('jwt_token');

  return jwtToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
