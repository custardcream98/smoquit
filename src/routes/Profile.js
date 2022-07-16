import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fireAuth } from "firebaseSetup";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    fireAuth.signOut();
    navigate("/", { replace: true });
  };
  return (
    <>
      <Button onClick={onLogOutClick} variant="outline-danger">
        로그아웃
      </Button>
    </>
  );
};

export default Profile;
