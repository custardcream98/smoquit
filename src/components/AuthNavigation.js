import React from "react";
import { Navbar } from "react-bootstrap";
import { RiGithubFill } from "react-icons/ri";

const AuthNavigation = () => {
  return (
    <Navbar bg="white" className="pt-1 pb-1">
      <a
        href="https://github.com/custardcream98/smoquit"
        target="_blank"
        className="ms-auto"
      >
        <RiGithubFill color="gray" size={30} />
      </a>
    </Navbar>
  );
};

export default AuthNavigation;
