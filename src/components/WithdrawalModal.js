import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const WithdrawalModal = ({ show, handleClose, onWithdrawalClick }) => {
  return (
    <>
      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>정말로 탈퇴하시겠어요? 😢</Modal.Title>
        </Modal.Header>
        <Modal.Body>가지 말고 Smoquit과 함께 #노담해요!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            어이쿠 내가 무슨짓을...
          </Button>
          <Button variant="outline-danger" onClick={onWithdrawalClick}>
            다시 올게요 안녕~
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

WithdrawalModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onWithdrawalClick: PropTypes.func.isRequired,
};

export default WithdrawalModal;
