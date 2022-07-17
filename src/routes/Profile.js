import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setProfile } from "store/actions/profileAction";

import { Button, Badge, ListGroup, Form, Row, Col } from "react-bootstrap";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { fireAuth, fireStore } from "firebaseSetup";
import { DOC_PROFILE } from "firebaseSetup/docNames";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    fireAuth.signOut();
    navigate("/", { replace: true });
  };

  const user = fireAuth.currentUser;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const [isDisplayNameEditable, setIsDisplayNameEditable] = useState(false);
  const [isCigPerDayEditable, setIsCigPerDayEditable] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [cigPerDay, setCigPerDay] = useState(profile.cigPerDay);
  const [isValid, setIsValid] = useState(true);

  const onClick = (event) => {
    switch (event.target.name) {
      case "displayName":
        if (isValid) {
          if (isDisplayNameEditable) {
            setIsDisplayNameEditable(false);
          } else {
            setIsDisplayNameEditable(true);
            setIsCigPerDayEditable(false);
          }
        }
        break;
      case "cigPerDay":
        if (isCigPerDayEditable) {
          setIsCigPerDayEditable(false);
        } else {
          setIsDisplayNameEditable(false);
          setIsCigPerDayEditable(true);
        }
        break;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isValid) {
      if (isDisplayNameEditable) {
        try {
          await updateProfile(user, {
            displayName: displayName,
          });
          await fireAuth.currentUser.reload();
        } catch (error) {
          console.log(error);
        }
      } else if (isCigPerDayEditable) {
        await updateDoc(doc(fireStore, DOC_PROFILE, user.uid), {
          cigPerDay: cigPerDay,
        });
      }

      dispatch(setProfile({ ...fireAuth.currentUser, cigPerDay }));
    }
  };

  const onChange = (event) => {
    switch (event.target.name) {
      case "displayName":
        setDisplayName(event.target.value);
        setIsValid(isDisplayNameValid(event.target.value));
        break;
      case "cigPerDay":
        setCigPerDay(event.target.value);
        break;
    }
  };

  const isDisplayNameValid = (name) => /^[A-Za-z][-A-Za-z0-9_]*$/.test(name);

  return (
    <>
      <Form noValidate validated={isValid} onSubmit={onSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs="3">
            닉네임
          </Form.Label>
          <Col xs="7" className="ps-0 pe-2">
            <Form.Control
              type="text"
              name="displayName"
              required
              maxLength={30}
              isValid={isDisplayNameEditable ? isValid : null}
              isInvalid={isDisplayNameEditable ? !isValid : null}
              readOnly={!isDisplayNameEditable}
              value={displayName}
              onChange={onChange}
            />
            <Form.Control.Feedback type="valid">
              금연인에 어울리는 닉네임이네요!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              닉네임은 알파벳 소문자, 대문자, _, 숫자만 사용할 수 있고,
              알파벳으로 시작해야만 해요.
            </Form.Control.Feedback>
          </Col>
          <Col xs="2" className="ps-0 pe-0">
            <Button
              type="submit"
              onSubmit={onSubmit}
              onClick={onClick}
              variant="outline-primary"
              name="displayName"
            >
              {isDisplayNameEditable ? "저장" : "수정"}
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column xs="6">
            하루에 피우는 담배 개피 수
          </Form.Label>
          <Col xs="4" className="ps-0 pe-2">
            <Form.Control
              type="number"
              name="cigPerDay"
              required
              readOnly={!isCigPerDayEditable}
              value={cigPerDay}
              onChange={onChange}
            />
          </Col>
          <Col xs="2" className="ps-0 pe-0">
            <Button
              type="submit"
              onSubmit={onSubmit}
              onClick={onClick}
              variant="outline-primary"
              name="cigPerDay"
            >
              {isCigPerDayEditable ? "저장" : "수정"}
            </Button>
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
