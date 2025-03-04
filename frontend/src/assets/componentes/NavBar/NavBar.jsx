import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./navbar.css";
import { useUserContext } from "../../../Context/UserContext";
import Home from "../Home/Home";

export const NavBar = () => {
  const { token, logout } = useUserContext();
  const location = useLocation();

  const handleLoginClick = () => {
    console.log("Login Button Clicked");
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar expand="md" className="navbar-custom mb-3">
        <Container
          fluid
          style={{
            paddingLeft: "0px",
            marginLeft: "2rem",
            paddingRight: "0px",
            marginRight: "2rem",
            width: "100vw",
            height: "5rem",
          }}
        >
          <Navbar.Brand
            as={NavLink}
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "navbar-brand active-link" : "navbar-brand"
            }
            style={{ fontWeight: "bold" }}
          >
            Nautilus Prestige
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            onClick={handleShow}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
            show={showOffcanvas}
            onHide={handleClose}
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  as={NavLink}
                  to="/destinos"
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Destinos
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/contacto"
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Contacto
                </Nav.Link>

                {token ? (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="/favoritos"
                      onClick={handleClose}
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                    >
                      Favoritos // CAMBIO: Cambié el texto a Favoritos
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/profile"
                      onClick={handleClose}
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                    >
                      Perfil
                    </Nav.Link>
                    <Button
                      className="loginButton"
                      style={{
                        backgroundColor: "#0DBCAD",
                        border: "2px solid #0DBCAD",
                      }}
                      onClick={() => {
                        logout();
                        handleClose();
                      }} 
                    >
                      Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="/register"
                      onClick={handleClose}
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                    >
                      Registrarse
                    </Nav.Link>
                    <Button
                      className="loginButton"
                      style={{
                        backgroundColor: "#0DBCAD",
                        border: "2px solid #0DBCAD",
                      }}
                      as={NavLink}
                      to="/login"
                      onClick={() => {
                        handleLoginClick();
                        handleClose();
                      }}
                    >
                      Iniciar Sesion
                    </Button>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {location.pathname === "/" && <Home />}
    </>
  );
};

export default NavBar;
