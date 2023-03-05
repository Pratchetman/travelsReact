import { Button } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

import "./navBar.scss"

export const NavBarTravels = () => {
    const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Travels
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/services">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
         
            <Button className="buttons" onClick={()=>navigate('/register')}>
              Register
            </Button>
            <Button className="buttons" onClick={()=>navigate('/login')}>
              Login
            </Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
