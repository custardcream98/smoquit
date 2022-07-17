import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "static/logo.png";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar bg="white">
      <Navbar.Brand className="d-flex align-items-center mb-0 ms-3">
        <img
          src={logo}
          alt="Smoquit Logo"
          width="35"
          height="35"
          className="me-2"
        />{" "}
        <span className={styles.GradientTitle}>Smoquit</span>
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
