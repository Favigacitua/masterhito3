import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import  {UserContext} from "../../../Context/UserContext"; 
import "./editarperfil.css";

export const EditarPerfil = () => {
  const { token } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repetirPassword: "",
    imagen: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repetirPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("apellido", formData.apellido);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.imagen) {
      formDataToSend.append("imagen", formData.imagen);
    }

    try {
      const response = await fetch("https://tu-servidor/api/editar-perfil", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al actualizar el perfil");
    }
  };

  return (
    <div>
      <h1 className="titulo">Editar</h1>

      <Form className="formularioeditar" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="apellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imagen">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="repetirPassword">
          <Form.Label>Repetir Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repetir Password"
            name="repetirPassword"
            value={formData.repetirPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button style={{ backgroundColor: "#0DBCAD", border: "2px solid #0DBCAD" }} type="submit">
          Enviar Cambios
        </Button>
      </Form>
    </div>
  );
};

export default EditarPerfil;
