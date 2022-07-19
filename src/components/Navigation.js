import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { AppLogo, AppTitle } from "./Logo";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar bg="white" className="pt-1 pb-1">
      <Navbar.Brand className="d-flex align-items-center mb-0 ms-3">
        <AppLogo size={30} />
        <AppTitle style={{ fontSize: "1rem" }} />
      </Navbar.Brand>
      <Nav className="ms-auto me-2">
        <Nav.Link as={Link} to="/" className={styles.NavBtn}>
          홈
        </Nav.Link>
        <Nav.Link as={Link} to="/history" className={styles.NavBtn}>
          도전내역
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className={styles.NavBtn}>
          프로필
        </Nav.Link>
        <Nav.Link as={Link} to="/leaderboard" className={styles.NavBtn}>
          리더보드
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
