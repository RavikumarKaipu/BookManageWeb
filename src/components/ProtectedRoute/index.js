<<<<<<< HEAD
import React from 'react';
import { Navigate } from 'react-router-dom';  // Import Navigate for redirection
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
  const jwtToken = Cookies.get('jwt_token');

  return jwtToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
=======
import React from 'react';
import { Navigate } from 'react-router-dom';  // Import Navigate for redirection
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
  const jwtToken = Cookies.get('jwt_token');

  return jwtToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
>>>>>>> 8b55888 (Remove node_modules from repo)
