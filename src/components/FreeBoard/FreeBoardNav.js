import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, CloseButton, Button } from "react-bootstrap";

const FreeBoardNav = () => {
  return (
    <>
      <Navbar bg="white" className="pt-1 pb-1">
        <Navbar.Brand className="d-flex align-items-center mb-0 ms-3">
          <CloseButton aria-label="Close" />
        </Navbar.Brand>
        <Nav className="ms-auto me-2">
          <Button>게시하기</Button>
        </Nav>
      </Navbar>
    </>
  );
};

export default FreeBoardNav;
