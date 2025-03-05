import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";  

const PublicRoute = ({ children }) => {
  const { token } = useUserContext();
  const location = useLocation();  

  // 🔴 Si el usuario está autenticado y está en login o register, lo redirige a /perfil
  if (token && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/perfil" />;
  }

  return children;  // 🔹 Renderiza los componentes hijos correctamente
};

export default PublicRoute;
