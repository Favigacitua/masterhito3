import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, ListGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useUserContext } from "../../../Context/UserContext";
import "./perfil.css";



export const Perfil = () => {
  const { user, token, fetchUserProfile } = useUserContext(); 

  const misDestinos = useRef(null);
  const mispublicaciones = useRef(null);
  
  const [nombre, setNombre] = useState("");
  const [destino, setDestino] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [viajes, setViajes] = useState([]);
  const [reseñas, setReseñas] = useState([]);

  
   useEffect(() => {
    console.log("📌 Cargando perfil desde el backend...");
    fetchUserProfile(); // 
  }, []); // 

  
  useEffect(() => {
    console.log("📌 Usuario actualizado en el perfil:", user);
    if (user) {
      setViajes(user.viajes || []);
      setReseñas(user.reseñas || []);
    }
  }, [user]); 
  

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 1 && value <= 5)) {
      setCalificacion(value);
    }
  };

 
  


  return (
    <div className="perfilcontainer">
      <div className="datos">
        <h1 style={{ color: "#0DBCAD", fontSize: "clamp(50px, 4vw, 24px)", padding: '2rem' }}>
          {user ? `${user.nombre} ${user.apellido}` : "Cargando..."}
        </h1>
        <div className="botonesperfil">
          <Button
            className="misdestinos"
            style={{ backgroundColor: "lightgrey", border: "2px solid grey", color: "#0DBCAD", margin: '1rem' }}
            onClick={() => scrollToSection(misDestinos)}
          >
            Mis destinos
          </Button>
          <Button
            className="mispublicaciones"
            style={{ backgroundColor: "lightgrey", border: "2px solid grey", color: "#0DBCAD", margin: '1rem' }}
            onClick={() => scrollToSection(mispublicaciones)}
          >
            Mis Publicaciones
          </Button>
          <Button
            className="Editar perfil"
            style={{ backgroundColor: "#0DBCAD", border: "2px solid #0DBCAD", margin: '1rem' }}
            as={NavLink}
            to="/editarperfil"
          >
            Editar perfil
          </Button>
        </div>
        <div>
          <div className="imagendeperfil">
          <img src={user?.imagen ? `http://localhost:3000/uploads/${user.imagen}` : "/sinimagen.png"} alt="Imagen de perfil" />
          </div>
        </div>
      </div>
      <div className="misexperiencias">
        <div className="misdestinos" ref={misDestinos}>
          <h3 style={{ color: "#0DBCAD" }}>Mis Destinos</h3>
          <div className="destinos-container">
            {viajes && viajes.map((viaje) => (
              <Card key={viaje.id} style={{ width: '18rem', minWidth: '18rem' }}>
                <Card.Img variant="top" src={viaje.image} alt={viaje.name} />
                <Card.Body>
                  <Card.Title>{viaje.name}</Card.Title>
                  <Card.Text>{viaje.description}</Card.Text>
                  <p><strong>Precio por persona:</strong> ${viaje.pricePerPerson}</p>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {viaje.destinations.map((destination, index) => (
                    <ListGroup.Item key={index}>{destination}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Body>
                  <Card.Link as={NavLink} to={`/viaje/${viaje.id}`} activeClassName="active">
                    Ver más información
                  </Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>

        <div className="mispublicaciones" ref={mispublicaciones}>
          <h3 style={{ color: "#0DBCAD" }}>Mis Publicaciones</h3>
          <div className="reseñas-container">
            {reseñas && reseñas.map((crucero) => (
              <div key={crucero.id}>
                {crucero.reviews.map((review, index) => (
                  <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>({review.rating} estrellas)</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{review.username}</Card.Subtitle>
                      <Card.Text>{review.comment}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="enviarpublicacion">
        <h1 className="titulo" style={{ color: "#0DBCAD", fontSize: "clamp(50px, 4vw, 24px)", padding: '2rem' }}>Califica tus viajes</h1>

        <Form className="formulariopublicacion">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ingresa tu nombre" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Destino</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ingresa el destino" 
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Calificación</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Ingrese una calificación (1-5)" 
              value={calificacion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cuenta tu experiencia</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Cuenta tu experiencia"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{ backgroundColor: "#0DBCAD", border: "2px solid #0DBCAD" }}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Perfil;
