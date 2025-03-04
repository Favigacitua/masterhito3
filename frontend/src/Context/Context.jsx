import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const MyContext = createContext({});

export const Context = ({ children }) => {
  const [cruceros, setCruceros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viajes, setViajes] = useState([]);
  const [filtroDestino, setFiltroDestino] = useState('');
  const [filtroFecha, setFiltroFecha] = useState(null);
  const [mensajeEnviado, setMensajeEnviado] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/cruceros.json');
        const data = await response.json();
        console.log("Cruceros cargados desde JSON:", data);

        setCruceros(data.cruceros);  
        setViajes(data.cruceros); 
      } catch (error) {
        console.error("Error al obtener los cruceros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 

  }, []); 

  useEffect(() => {
    setFiltroDestino(''); 
    setFiltroFecha(null); 
    setViajes(cruceros); 
  }, [location]);

  
  const aplicarFiltros = () => {
    let filteredViajes = [...cruceros];
    
    if (filtroDestino) {
      filteredViajes = filteredViajes.filter(viaje =>
        viaje.destinations.some(destino =>
          destino.toLowerCase().includes(filtroDestino.toLowerCase()) 
        )
      );
    }

    if (filtroFecha) {
      filteredViajes = filteredViajes.filter(viaje =>
        new Date(viaje.departureDate) >= filtroFecha 
      );
    }

    setViajes(filteredViajes);
  };

  
  const actualizarFiltroDestino = (nuevoDestino) => {
    setFiltroDestino(nuevoDestino);
  };

  
  const actualizarFiltroFecha = (nuevaFecha) => {
    setFiltroFecha(nuevaFecha);
  };

  
  const resetFiltros = () => {
    setFiltroDestino(''); 
    setFiltroFecha(null); 
    setViajes(cruceros); 
  };

  
  const resetViajes = () => {
    setViajes(cruceros);
  };

 
  useEffect(() => {
    if (filtroDestino || filtroFecha) {
      aplicarFiltros();
    }
  }, [filtroDestino, filtroFecha]);



  const enviarFormularioContacto = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMensajeEnviado({ success: true, message: 'Mensaje enviado con éxito' });
      } else {
        setMensajeEnviado({ success: false, message: 'Error al enviar el mensaje' });
      }
    } catch (error) {
      setMensajeEnviado({ success: false, message: 'No se pudo enviar el mensaje, intenta nuevamente.' });
      console.error("Error al enviar el formulario de contacto:", error);
    }
  };

  const globalState = {
    cruceros,
    loading,
    viajes,
    filtroDestino,
    filtroFecha,
    actualizarFiltroDestino,
    actualizarFiltroFecha,
    resetFiltros,
    resetViajes,
    enviarFormularioContacto, 
    mensajeEnviado

  };

  return (
    <MyContext.Provider value={globalState}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
