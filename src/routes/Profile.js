import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "store/actions/profileAction";
import { setCampaigns } from "store/actions/campaignsAction";
import {
  Button,
  Form,
  Row,
  Col,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import { updateProfile, deleteUser } from "firebase/auth";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { fireAuth, fireStore } from "firebaseSetup";
import {
  DOC_PROFILE,
  DOC_CAMPAIGNS_BY_USER,
  DOC_CAMPAIGNS,
} from "firebaseSetup/docNames";
import WithdrawalModal from "components/Profile/WithdrawalModal";
import styles from "styles/Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    fireAuth.signOut().then(() => {
      dispatch(setCampaigns({ campaigns: [] }));
      dispatch(setProfile({}));
    });
    navigate("/", { replace: true });
  };

  const [isWithdrawalClicked, setIsWithdrawalClicked] = useState(false);
  const toggleIsWithdrawalModalClick = () =>
    setIsWithdrawalClicked((priv) => !priv);
  const onWithdrawalClick = () => {
    deleteUser(fireAuth.currentUser);
    navigate("/", { replace: true });
  };

  const user = fireAuth.currentUser;

  const profile = useSelector((state) => state.profile);

  const [isDisplayNameEditable, setIsDisplayNameEditable] = useState(false);
  const [isCigPerDayEditable, setIsCigPerDayEditable] = useState(false);
  const [displayNameEditLoading, setDisplayNameEditLoading] = useState(false);
  const [cigPerDayEditLoading, setCigPerDayEditLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [cigPerDay, setCigPerDay] = useState(profile.cigPerDay);
  // const [isValid, setIsValid] = useState(true);

  const [toastA, setToastA] = useState(false);
  const [toastB, setToastB] = useState(false);
  const toggleToastA = () => setToastA((priv) => !priv);
  const toggleToastB = () => setToastB((priv) => !priv);

  const onClick = async (event) => {
    let isDisplayName = false;
    let isCigPerDay = false;
    setToastA(false);
    setToastB(false);
    switch (event.target.name) {
      case "displayName":
        // if (isValid) {
        if (isDisplayNameEditable) {
          if (displayName !== user.displayName) {
            setDisplayNameEditLoading(true);
            isDisplayName = true;
            await updateProfile(user, {
              displayName: displayName,
            });
            const campaigns = await getDocs(
              collection(
                fireStore,
                DOC_CAMPAIGNS_BY_USER,
                profile.uid,
                DOC_CAMPAIGNS
              )
            );
            campaigns.forEach(
              async (doc) => await updateDoc(doc.ref, { userName: displayName })
            );
            await fireAuth.currentUser.reload();
          }

          setIsDisplayNameEditable(false);
        } else {
          setCigPerDay(profile.cigPerDay);
          setIsDisplayNameEditable(true);
          setIsCigPerDayEditable(false);
        }
        // }
        break;
      case "cigPerDay":
        if (isCigPerDayEditable) {
          if (cigPerDay !== profile.cigPerDay) {
            setCigPerDayEditLoading(true);
            isCigPerDay = true;
            await updateDoc(doc(fireStore, DOC_PROFILE, user.uid), {
              cigPerDay: cigPerDay,
            });
          }
          setIsCigPerDayEditable(false);
        } else {
          setDisplayName(user.displayName);
          setIsDisplayNameEditable(false);
          setIsCigPerDayEditable(true);
        }
        break;
    }
    dispatch(setProfile({ ...fireAuth.currentUser, cigPerDay }));

    if (isDisplayName) toggleToastA();
    else if (isCigPerDay) toggleToastB();

    setDisplayNameEditLoading(false);
    setCigPerDayEditLoading(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onChange = (event) => {
    switch (event.target.name) {
      case "displayName":
        setDisplayName(event.target.value);
        // setIsValid(isDisplayNameValid(event.target.value));
        break;
      case "cigPerDay":
        setCigPerDay(event.target.value);
        break;
    }
  };

  // const isDisplayNameValid = (name) =>
  //   /^[A-Za-z][-A-Za-z0-9_]*$/.test(name) && name.length >= 4;

  const toastMsg = (show, onClose, name) => (
    <ToastContainer position="bottom-center" className="pb-4">
      <Toast show={show} onClose={onClose}>
        <Toast.Header className="justify-content-between">
          변경 완료 ✅
        </Toast.Header>
        <Toast.Body>
          <strong>{name}</strong>
          {name[name.length - 1] === "수" ? "를" : "을"} 변경했어요!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );

  return (
    <>
      {/* <Form noValidate validated={isValid} onSubmit={onSubmit}> */}
      <Form noValidate validated={!displayName} onSubmit={onSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs="3">
            이메일
          </Form.Label>
          <Col xs="9" className="ps-0 pe-2">
            <Form.Control
              type="email"
              name="email"
              readOnly
              value={user.email}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className={`mb-3 ${styles.InputLine}`}>
          <Form.Label column xs="3">
            닉네임
          </Form.Label>
          <Col xs="7" className="ps-0 pe-2">
            <Form.Control
              type="text"
              name="displayName"
              required
              maxLength={30}
              minLength={4}
              // isValid={
              //   isDisplayNameEditable && displayName !== user.displayName
              //     ? isValid
              //     : null
              // }
              isInvalid={isDisplayNameEditable ? !displayName : null}
              readOnly={!isDisplayNameEditable}
              value={displayName}
              onChange={onChange}
            />
            {/* <Form.Control.Feedback type="valid">
              멋진 닉네임이네요!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              <li>알파벳 소문자, 대문자, _, 숫자만 사용할 수 있어요.</li>
              <li>알파벳으로 시작해야 해요.</li>
              <li>최소 4글자 이상 입력해주세요.</li>
            </Form.Control.Feedback> */}
          </Col>
          <Col xs="2" className={`ps-0 pe-0 ${styles.Center}`}>
            <Button
              size="sm"
              type="submit"
              onSubmit={onSubmit}
              onClick={onClick}
              variant={
                !isDisplayNameEditable || displayName !== user.displayName
                  ? "outline-primary"
                  : "outline-danger"
              }
              name="displayName"
              disabled={
                displayNameEditLoading || displayName === "" // || !isValid
              }
              className="d-flex justify-content-center align-items-center"
            >
              {isDisplayNameEditable ? (
                displayNameEditLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : displayName !== user.displayName ? (
                  "저장"
                ) : (
                  "취소"
                )
              ) : (
                "수정"
              )}
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className={`mb-4 ${styles.InputLine}`}>
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
              isInvalid={cigPerDay <= 0}
              onChange={onChange}
              disabled={cigPerDayEditLoading || cigPerDay === 0}
            />
            <Form.Control.Feedback type="invalid">
              <li>최소 1개피 이상으로 지정해주세요.</li>
            </Form.Control.Feedback>
          </Col>
          <Col xs="2" className={`ps-0 pe-0 ${styles.Center}`}>
            <Button
              size="sm"
              type="submit"
              onSubmit={onSubmit}
              onClick={onClick}
              variant={
                !isCigPerDayEditable || cigPerDay !== profile.cigPerDay
                  ? "outline-primary"
                  : "outline-danger"
              }
              name="cigPerDay"
              disabled={cigPerDayEditLoading || cigPerDay <= 0}
              className="d-flex justify-content-center align-items-center"
            >
              {isCigPerDayEditable ? (
                cigPerDayEditLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : cigPerDay !== profile.cigPerDay ? (
                  "저장"
                ) : (
                  "취소"
                )
              ) : (
                "수정"
              )}
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <div className="d-flex flex-row justify-content-end mt-5">
        <Button
          onClick={toggleIsWithdrawalModalClick}
          variant="outline-danger"
          style={{ fontSize: ".9rem" }}
          disabled={isWithdrawalClicked}
        >
          회원탈퇴
        </Button>
      </div>
      <div className="d-flex flex-row justify-content-end mt-4">
        <Button
          onClick={onLogOutClick}
          variant="danger"
          style={{ fontSize: ".9rem" }}
        >
          로그아웃
        </Button>
      </div>
      {toastMsg(toastA, toggleToastA, "닉네임")}
      {toastMsg(toastB, toggleToastB, "하루에 피우는 담배 개피 수")}
      <WithdrawalModal
        show={isWithdrawalClicked}
        handleClose={toggleIsWithdrawalModalClick}
        onWithdrawalClick={onWithdrawalClick}
      />
    </>
  );
};

export default Profile;
