import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FaHome, FaUserAlt, FaHistory } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import * as constants from "core/constants";
import { AppLogo, AppTitle } from "components/Common/Logo";
import AboutModal from "./AboutModal";
import styles from "styles/Navigation.module.css";

const Navigation = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const location = useLocation();

  const onLogoClick = () => setShowAboutModal(true);
  const onAboutModalClose = () => setShowAboutModal(false);

  return location.pathname !== constants.PATH_FREEBOARD_CREATE ? (
    <>
      <Navbar bg="white" className="pt-1 pb-1">
        <Navbar.Brand className="d-flex align-items-center mb-0 ms-3">
          <div onClick={onLogoClick} className={styles.Logo}>
            <AppLogo size={30} />
            <AppTitle style={{ fontSize: "1rem" }} />
          </div>
        </Navbar.Brand>
        <Nav className="ms-auto me-2">
          <Nav.Link
            as={Link}
            to={constants.PATH_HOME}
            className={styles.NavBtn}
          >
            <FaHome />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={constants.PATH_HISTORY}
            className={styles.NavBtn}
          >
            <FaHistory />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={constants.PATH_PROFILE}
            className={styles.NavBtn}
          >
            <FaUserAlt />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={constants.PATH_LEADERBOARD}
            className={styles.NavBtn}
          >
            <MdLeaderboard />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={constants.PATH_FREEBOARD}
            className={styles.NavBtn}
          >
            <BiMessageSquareDetail />
          </Nav.Link>
        </Nav>
      </Navbar>
      <AboutModal show={showAboutModal} handleClose={onAboutModalClose} />
    </>
  ) : null;
};

export default Navigation;
