import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const MyContext = createContext({});

export const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [viajes, setViajes] = useState([]);
  const [filtroDestino, setFiltroDestino] = useState('');
  const [filtroFecha, setFiltroFecha] = useState(null);
  const [mensajeEnviado, setMensajeEnviado] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/viajes");  // 🔹 QUITADO "/" extra en la URL
        const data = await response.json();
        console.log("📌 Viajes cargados desde backend:", data);

        if (Array.isArray(data)) {
          setViajes(data);
        } else if (data.viajes && Array.isArray(data.viajes)) {
          setViajes(data.viajes); // Ajuste si la API devuelve un objeto con `viajes`
        } else {
          console.error("❌ Formato inesperado de viajes en la API:", data);
        }
      } catch (error) {
        console.error("Error al obtener los viajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 

  }, []); 

  useEffect(() => {
    setFiltroDestino(''); 
    setFiltroFecha(null); 
    setViajes(viajes); 
  }, [location]);

  
  const aplicarFiltros = () => {
    let filteredViajes = [...viajes];
    
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
    setViajes(viajes); 
  };

  
  const resetViajes = () => {
    setViajes(viajes);
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
