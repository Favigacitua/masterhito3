import React from 'react';
import { useUserContext } from '../../../Context/UserContext';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './favoritos.css'

const Favoritos = () => {
  const { favoritos } = useUserContext(); 
  return (
    <div>
    <Container className="mt-4">
      <p style={{fontWeight:'bold', color: '#0DBCAD', textAlign:'center', paddingTop:'2rem'}}>Estos son tus destinos favoritos</p>
      <br /><br />
      <h2 style={{fontWeight:'lighter', textAlign:'center'}}>Mis Favoritos</h2>
      <br /><br />
      {favoritos.length === 0 ? (
        <p>No tienes viajes favoritos aún :( </p>
      ) : (
        <Row>
           {favoritos.map((viaje) => (
    <Col key={viaje.id} md={4} className="mb-3">
      <Card className='cardviaje' style={{ width: '18rem', minWidth: '18rem' }}>
        <Card.Img variant="top" src={viaje.image} alt={viaje.name} />
        <Card.Body>
          <Card.Title>{viaje.name}</Card.Title>
          <Card.Text>{viaje.description}</Card.Text>
          <br />
          <p><strong>Precio por persona:</strong> ${viaje.pricePerPerson}</p>
        </Card.Body>
        <div className='linkdestino'>
          <Card.Link as={NavLink} to={`/viaje/${viaje.id}`} activeClassName="active">
            Ver más información
          </Card.Link>
        </div>
      </Card>
    </Col>
  ))}
        </Row>
      )}
    </Container>

<div className="descargalaapp">
<img className="imagen" src='/descargalaapp.png' alt="descargalaapp" />
</div>
<div className="ofertasalcorreo">
<img className="imagen" src='/ofertasalcorreo.png' alt="ofertasalcorreo" />
</div>

</div>
  );
};

export default Favoritos;