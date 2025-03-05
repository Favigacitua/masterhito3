import React from 'react';
import Card from 'react-bootstrap/Card';

import { NavLink } from 'react-router-dom';
import './cardviaje.css'

function CardViaje({ viaje }) {

  console.log("📌 Viaje recibido en CardViaje:", viaje)

  return (
    <Card className='cardviaje' style={{ width: '18rem', minWidth: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:3000/uploads/${viaje.imagen}`} alt={viaje.nombre} />
      <Card.Body>
        <Card.Title >{viaje.nombre}</Card.Title>
        <Card.Text>{viaje.descripcion}</Card.Text>
        <br />
        <p><strong>Precio por persona:</strong> ${viaje.precio}</p>
      </Card.Body>
      <div className='linkdestino'>
      <Card.Link as={NavLink} to={`/viaje/${viaje.id}`} className={({ isActive }) => isActive ? "active" : ""}>
Ver más información</Card.Link>
      </div>
    </Card>
  );
}

export default CardViaje;