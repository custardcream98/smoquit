import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "static/logo.png";

const Navigation = () => (
  <Navbar bg="white">
    <Container className="container-fluid">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center mb-0">
        {/* <img
          src={logo}
          alt="Smoquit Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "} */}
        Smoquit
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/profile">
          프로필
        </Nav.Link>
        <Nav.Link as={Link} to="/leaderboard">
          리더보드
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
