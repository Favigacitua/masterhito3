import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { MyContext } from '../../../Context/Context';
import './cardreseña.css'

export const CardReseña = ({ viajeId }) => {
  const { viajes } = useContext(MyContext); 

 
  const crucero = viajes.find(c => c.id === viajeId);
  
  if (!crucero) {
    return <p>No se encontraron reseñas para este viaje.</p>;
  }

  return (
    <div  className="reseñas-container">
      {crucero.reviews.map((review, index) => (
        <Card  className='reseñas' key={index} >
          <Card.Body>
            <Card.Title>({review.rating} estrellas)</Card.Title>
            <Card.Subtitle className="mb-2 text-muted" style={{fontWeight:'bold'}}>@{review.username}</Card.Subtitle>
            <Card.Text>{review.comment}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CardReseña;
