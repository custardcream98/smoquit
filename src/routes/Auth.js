import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Overlay,
  Popover,
} from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { fireAuth, fireStore } from "firebaseSetup";
import { DOC_PROFILE } from "firebaseSetup/docNames";
import {
  WrongPasswordModal,
  AlreadyInUseModal,
} from "components/Auth/AuthModal";
import { AppTitle, AppLogo } from "components/Common/Logo";
import AuthNavigation from "components/Auth/AuthNavigation";
import Google from "static/Google.webp";
import styles from "styles/Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHasFocus, setIsPasswordHasFocus] = useState(false);
  const [isEmailHasFocus, setIsEmailHasFocus] = useState(false);
  const [isEmailLoginClicked, setIsEmailLoginClicked] = useState(false);
  const [isGoogleLoginClicked, setIsGoogleLoginClicked] = useState(false);
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [showAlreadyInUseModal, setShowAlreadyInUseModal] = useState(false);
  const passwordMsgOverlayTargetRef = useRef(null);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onWrongPasswordModalClose = () => setShowWrongPasswordModal(false);
  const onAlreadyInUseModalClose = () => setShowAlreadyInUseModal(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsEmailLoginClicked(true);
    try {
      await signInWithEmailAndPassword(fireAuth, email, password);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      if (error.code === "auth/wrong-password") {
        setIsEmailLoginClicked(false);
        setShowWrongPasswordModal(true);
        return;
      } else if (error.code === "auth/user-not-found") {
        let createdUser;
        try {
          createdUser = await createUserWithEmailAndPassword(
            fireAuth,
            email,
            password
          );
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            setShowAlreadyInUseModal(true);
          }
          setIsEmailLoginClicked(false);
          return;
        }

        await updateProfile(createdUser.user, {
          displayName: createdUser.user.email.split("@")[0],
        });
        await setDoc(doc(fireStore, DOC_PROFILE, createdUser.user.uid), {
          cigPerDay: 20,
        });
        await signInWithEmailAndPassword(fireAuth, email, password);
      }
    }
  };

  const onGoogleSignInClick = async (event) => {
    setIsGoogleLoginClicked(true);
    let provider;
    if (event.target.name === "google") {
      provider = new GoogleAuthProvider();
    }
    try {
      const createdUser = await signInWithPopup(fireAuth, provider);
      await setDoc(doc(fireStore, DOC_PROFILE, createdUser.user.uid), {
        cigPerDay: 20,
      });
    } catch (error) {
      setError(error.message);
      setIsEmailLoginClicked(false);
    }
  };

  const validateEmail = () =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const checkPasswordStrong = () =>
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
      password
    );

  const checkPasswordMedium = () =>
    /((?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,}))/.test(password);

  const checkPasswordSecurity = () => {
    if (checkPasswordStrong()) {
      return "??????";
    } else if (checkPasswordMedium()) {
      return "??????";
    } else {
      return "??????";
    }
  };

  const weakPasswordMsg = (
    <>
      <li>?????? 6??? ???????????? ????????? ??????.</li>
      <li>???????????? ?????? ?????? ????????? ??????.</li>
      <li>????????? ?????? ?????? ????????? ??????.</li>
    </>
  );

  const onPasswordInputFocus = () => setIsPasswordHasFocus(true);
  const onPasswordInputBlur = () => setIsPasswordHasFocus(false);
  const onEmailInputFocus = () => setIsEmailHasFocus(true);
  const onEmailInputBlur = () => setIsEmailHasFocus(false);

  return (
    <>
      <AuthNavigation />
      <div className="ms-2">
        <AppLogo className="mt-4" size={50} />
        <br></br>
        <AppTitle style={{ fontSize: "2.5rem" }} />
        <p className={`mb-1 ${styles.Subtitle}`}>
          ?????? ?????? <strong>#??????</strong>??????_?????????{" "}
          <strong>#?????? #??????</strong>
        </p>
        <span className={`mb-1 ${styles.Subtitle}`}>
          <strong>??????</strong>?????? ????????? ?????? <strong>?????? ?????????</strong>
        </span>
      </div>
      <div className={styles.Center}>
        <div className={`${styles.FormBox}`}>
          <Form onSubmit={onSubmit} className="mt-4" noValidate>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="3" className={styles.SmallFont}>
                ?????????
              </Form.Label>
              <Col xs="9" className="ps-0 pe-3">
                <Form.Control
                  className={styles.SmallFont}
                  type="email"
                  name="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  isInvalid={
                    !validateEmail() && isEmailHasFocus && email.length > 4
                  }
                  value={email}
                  onChange={onChange}
                  onFocus={onEmailInputFocus}
                  onBlur={onEmailInputBlur}
                />
                <Form.Control.Feedback type="invalid">
                  ????????? ????????? ?????? ?????????.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="3" className={styles.SmallFont}>
                ????????????
              </Form.Label>
              <Col xs="9" className="ps-0 pe-3">
                <Form.Control
                  className={styles.SmallFont}
                  type="password"
                  name="password"
                  required
                  isInvalid={
                    checkPasswordSecurity() === "??????" && isPasswordHasFocus
                  }
                  value={password}
                  onChange={onChange}
                  onFocus={onPasswordInputFocus}
                  onBlur={onPasswordInputBlur}
                  ref={passwordMsgOverlayTargetRef}
                />

                <Overlay
                  target={passwordMsgOverlayTargetRef.current}
                  show={isPasswordHasFocus}
                  placement={"top"}
                >
                  <Popover>
                    <Popover.Body className={styles.SmallFont}>
                      ???????????? ?????? <strong>{checkPasswordSecurity()}</strong>
                      {checkPasswordSecurity() === "??????"
                        ? weakPasswordMsg
                        : null}
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </Col>
            </Form.Group>
            <div className="d-flex flex-row justify-content-end">
              <Button
                onClick={onSubmit}
                variant="outline-primary"
                className={`me-2 mt-2 col-6 d-flex justify-content-center align-middle ${styles.SmallFont} ${styles.Btn}`}
                disabled={
                  isEmailLoginClicked ||
                  checkPasswordSecurity() === "??????" ||
                  !validateEmail()
                }
              >
                {isEmailLoginClicked ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : null}
                ???????????? / ?????????
              </Button>
            </div>
          </Form>

          <div className={styles.FormBoxBtn}>
            <Button
              name="google"
              onClick={onGoogleSignInClick}
              variant="outline-dark"
              className={`me-2 col-6 d-flex justify-content-center align-middle ${styles.SmallFont} ${styles.Btn}`}
              disabled={isGoogleLoginClicked}
            >
              {isGoogleLoginClicked ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : null}
              <img
                width="20px"
                className="me-2"
                alt="Google sign-in"
                src={Google}
              />
              Google ?????????
            </Button>
          </div>
        </div>
      </div>
      <WrongPasswordModal
        show={showWrongPasswordModal}
        handleClose={onWrongPasswordModalClose}
      />
      <AlreadyInUseModal
        show={showAlreadyInUseModal}
        handleClose={onAlreadyInUseModalClose}
      />
    </>
  );
};

export default Auth;
