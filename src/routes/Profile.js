import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Badge, ListGroup, Form, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { fireAuth } from "firebaseSetup";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    fireAuth.signOut();
    navigate("/", { replace: true });
  };

  const user = fireAuth.currentUser;
  const profile = useSelector((state) => state.profile);

  // useEffect(() => {
  //   console.log(fireAuth.currentUser.providerId);
  // }, []);

  return (
    <>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4">
            닉네임
          </Form.Label>
          <Col>
            <Form.Control readOnly defaultValue={user.displayName} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="4">
            하루에 피우는 담배 개피 수
          </Form.Label>
          <Col>
            <Form.Control readOnly defaultValue={profile.cigPerDay} />
          </Col>
        </Form.Group>
      </Form>

      <Button onClick={onLogOutClick} variant="outline-danger">
        로그아웃
      </Button>
    </>
  );
};

export default Profile;
