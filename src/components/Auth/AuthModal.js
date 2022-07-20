import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

export const WrongPasswordModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호가 다릅니다 😢</Modal.Title>
        </Modal.Header>
        <Modal.Body>다시 한번 시도해주세요!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            넵
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

WrongPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export const AlreadyInUseModal = ({ show, handleClose }) => (
  <>
    <Modal show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>이미 가입된 유저입니다 😢</Modal.Title>
      </Modal.Header>
      <Modal.Body>다시 한번 시도해주세요!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          넵
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

AlreadyInUseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
