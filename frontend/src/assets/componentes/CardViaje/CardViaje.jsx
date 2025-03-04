import React from 'react';
import Card from 'react-bootstrap/Card';

import { NavLink } from 'react-router-dom';
import './cardviaje.css'

function CardViaje({ viaje }) {
  return (
    <Card className='cardviaje' style={{ width: '18rem', minWidth: '18rem' }}>
      <Card.Img variant="top" src={viaje.image} alt={viaje.name} />
      <Card.Body>
        <Card.Title >{viaje.name}</Card.Title>
        <Card.Text>{viaje.description}</Card.Text>
        <br />
        <p><strong>Precio por persona:</strong> ${viaje.pricePerPerson}</p>
      </Card.Body>
      <div className='linkdestino'>
      <Card.Link as={NavLink} to={`/viaje/${viaje.id}`} activeClassName="active">Ver más información</Card.Link>
      </div>
    </Card>
  );
}

export default CardViaje;