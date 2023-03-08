import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

import "./navBar.scss"
import { TravelsContext } from "../context/TravelsContext";

export const NavBarTravels = () => {
    const navigate = useNavigate();
    const {user, logged, setLogged, setUser, setTravel, token, setToken } = useContext(TravelsContext);

    const logOut = () =>{
      localStorage.removeItem("token");
      setLogged(false);
      setUser();
      setTravel();
      navigate("/")
      setToken();
    }
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
            {(user?.type === 0  && logged === true) && <Nav.Link as={Link} to="/allUsers">
              Todos los usuarios
            </Nav.Link>}
          </Nav>
          {!logged ? null : user.img !== "" ?<div className="imgSmall" onClick={()=>navigate("/user")}><img  src={`./images/user/${user.img}`} alt="" /></div> : <div className="nameSmall"><h1>{user.name[0]}</h1></div> }
          { !logged ? <Button className="buttons" onClick={()=>navigate('/register')}>
              Register
            </Button> : <Button className="buttons" onClick={()=>navigate('/user')}>
              Perfil de: {user.name}
            </Button>}
            { !logged ?
            <Button className="buttons" onClick={()=>navigate('/login')}>
              Login
            </Button> :  <Button className="buttons" onClick={logOut}>
              LogOut
            </Button>  }  
         
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
