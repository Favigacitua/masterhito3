import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import { MyContext } from '../../../Context/Context';
import {UserContext } from '../../../Context/UserContext'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import './destinodetailcard.css';

export const DestinoDetailCard = () => {
  const { cruceros } = useContext(MyContext);
  const { id } = useParams();  
  const { addFavoritos } = useContext(UserContext); 
  const [crucero, setCrucero] = useState(null);

  useEffect(() => {
    const selectedCrucero = cruceros.find(c => c.id === id);
    setCrucero(selectedCrucero);
  }, [id, cruceros]);

  if (!crucero) {
    return <p>Cargando detalles del crucero...</p>;  
  }

  
  const handleAddToFavorites = () => {
    addFavoritos(crucero.id);  
  };

  return (
    <div className="destino-detail-card">
      {crucero?.image ? (
        <img src={crucero.image} alt={crucero.name} className="destino-detail-image" />
      ) : (
        <p>No hay imagen disponible</p>
      )}
  
      <div className="destino-detail-info">
        <h2>{crucero?.name || "Nombre no disponible"}</h2>
        <p>{crucero?.description || "Descripción no disponible"}</p>
        <p><strong>Precio por persona:</strong> ${crucero?.pricePerPerson || "Precio no disponible"}</p>
        <p><strong>Fechas:</strong> {crucero?.departureDate || "Fecha no disponible"} - {crucero?.returnDate || "Fecha no disponible"}</p>
        <p><strong>Capacidad:</strong> {crucero?.capacity || "Capacidad no disponible"}</p>
  
        <p><strong>Destinos:</strong></p>
        {Array.isArray(crucero?.destinations) && crucero.destinations.length > 0 ? (
          <ListGroup className="list-group-flush">
            {crucero.destinations.map((destination, index) => (
              <ListGroup.Item key={index}>{destination}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Destinos no disponibles</p>
        )}
        <br />
  
        <p><strong>Características:</strong> {Array.isArray(crucero?.features) ? crucero.features.join(", ") : "Características no disponibles"}</p>
        
        <Button
          className="añadirfavoritos"
          style={{ backgroundColor: "#0DBCAD", border: "2px solid #0DBCAD", color: "white", margin: '1rem' }}
          onClick={handleAddToFavorites}
        >
          Añadir a favoritos
        </Button>
      </div>
    </div>
  );
};

export default DestinoDetailCard;