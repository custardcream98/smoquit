import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { AppLogoWithTitle } from "./Logo";

const Navigation = () => {
  return (
    <Navbar bg="white">
      <Navbar.Brand className="d-flex align-items-center mb-0 ms-3">
        <AppLogoWithTitle />
      </Navbar.Brand>
      <Nav className="ms-auto me-2">
        <Nav.Link as={Link} to="/">
          홈
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          프로필
        </Nav.Link>
        <Nav.Link as={Link} to="/leaderboard">
          리더보드
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
