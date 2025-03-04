import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext); 
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    try {
      return savedToken ? JSON.parse(savedToken) : null; 
    } catch (error) {
      console.error('Error parsing token:', error);
      return null; 
    }
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null; 
    } catch (error) {
      console.error('Error parsing user:', error);
      return null; 
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);


 

  const register = async (nombre, apellido, email, password) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario registrado correctamente');
        return { success: true };
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); 
        setUser(data.user);
        console.log('Token recibido:', data.token);
        return { success: true }; 
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setToken(null); 
    setUser(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/perfil', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); 
        return { success: true, user: data };
      } else {
        return { success: false, message: 'Error al obtener el perfil.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateUserProfile = async (updatedData) => {
    if (!token) {
      return { success: false, message: 'Token no disponible. Inicia sesión.' };
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
       
        setUser(data);
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message || 'Error al actualizar perfil.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const postReview = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/resenas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Reseña enviada correctamente');
        return { success: true };
      } else {
        return { success: false, message: result.message || 'Error al enviar la reseña.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const favoritos = async () => {
    try {
      const response = await fetch('http://localhost:3000/favoritos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, favorites: data };
      } else {
        return { success: false, message: 'Error al obtener favoritos.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addFavoritos = async (destinoId) => {
    try {
      const response = await fetch('http://localhost:3000/favoritos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ destinoId }),
      });

      const result = await response.json();

      if (response.ok) {
        setUser(prevUser => ({
          ...prevUser,
          favorites: [...prevUser.favorites, { id: destinoId }]
        }));
        console.log('Destino añadido a favoritos');
        return { success: true };
      } else {
        return { success: false, message: result.message || 'Error al añadir a favoritos.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const removeFavoritos = async (destinoId) => {
    try {
      const response = await fetch(`http://localhost:3000/favoritos/${destinoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Destino eliminado de favoritos');
        return { success: true };
      } else {
        return { success: false, message: result.message || 'Error al eliminar de favoritos.' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };



  const value = {
    token,
    user,
    register,
    login,
    logout,
    fetchUserProfile,
    updateUserProfile,
    postReview,          
    favoritos,      
    addFavoritos,         
    removeFavoritos,    
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


export {UserContext}; 

