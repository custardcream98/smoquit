import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FaHome, FaUserAlt, FaHistory } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { AppLogo, AppTitle } from "components/Logo";
import AboutModal from "./AboutModal";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const onLogoClick = () => setShowAboutModal(true);
  const onAboutModalClose = () => setShowAboutModal(false);

  return (
    <>
      <Navbar bg="white" className="pt-1 pb-1">
        <Navbar.Brand className="d-flex align-items-center mb-0 ms-3">
          <div onClick={onLogoClick} className={styles.Logo}>
            <AppLogo size={30} />
            <AppTitle style={{ fontSize: "1rem" }} />
          </div>
        </Navbar.Brand>
        <Nav className="ms-auto me-2">
          <Nav.Link as={Link} to="/" className={styles.NavBtn}>
            <FaHome />
          </Nav.Link>
          <Nav.Link as={Link} to="/history" className={styles.NavBtn}>
            <FaHistory />
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" className={styles.NavBtn}>
            <FaUserAlt />
          </Nav.Link>
          <Nav.Link as={Link} to="/leaderboard" className={styles.NavBtn}>
            <MdLeaderboard />
          </Nav.Link>
        </Nav>
      </Navbar>
      <AboutModal show={showAboutModal} handleClose={onAboutModalClose} />
    </>
  );
};

export default Navigation;
