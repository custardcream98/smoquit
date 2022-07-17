import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

// export const UserExistsModal = ({ email }) => {
//   return (
//     <>
//       <Modal show onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>잘못된 이메일입니다 😢</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{email}은 이미 가입이 돼있는 이메일이네요!</Modal.Body>
//       </Modal>
//     </>
//   );
// };

// UserExistsModal.propTypes = {
//   email: PropTypes.string.isRequired,
// };

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
