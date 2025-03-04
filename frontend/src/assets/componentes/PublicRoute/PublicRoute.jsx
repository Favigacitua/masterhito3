// PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {UserContext} from '../../../Context/UserContext';  

const PublicRoute = ({ children }) => {
  const { token } = useContext(UserContext); 

  if (token) {
    return <Navigate to="/perfil" />; 
  }

  return children;
};

export default PublicRoute;