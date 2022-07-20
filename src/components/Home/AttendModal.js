import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";
import { ATTEND_INTERVAL, timeDelta2str } from "core";

const AttendModal = ({
  startsAt,
  noAttend,
  leftAttendTime,
  duration,
  lastAttend,
  setLeftAttendTime,
  setTimer,
}) => {
  const [show, setShow] = useState(false);
  const profile = useSelector((state) => state.profile);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClick = async () => {
    const campaignDocRef = doc(
      fireStore,
      DOC_CAMPAIGNS_BY_USER,
      profile.uid,
      DOC_CAMPAIGNS,
      `${startsAt.getTime()}`
    );

    await updateDoc(campaignDocRef, {
      duration:
        duration +
        (leftAttendTime > 0 ? Date.now() - lastAttend : ATTEND_INTERVAL),
      lastAttend: Date.now(),
    });
    setTimer(
      duration +
        (leftAttendTime > 0 ? Date.now() - lastAttend : ATTEND_INTERVAL + 1)
    );
    setLeftAttendTime(ATTEND_INTERVAL);

    handleClose();
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        className="d-flex flex-column mt-3 justify-content-center align-items-center"
      >
        {noAttend ? (
          <span>
            <strong>출첵할 시간이에요! ⏰</strong>
          </span>
        ) : (
          <>
            <span>노담타임 남은 시간 ⏰ </span>
            <span>{timeDelta2str(leftAttendTime)}</span>
          </>
        )}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>매일 매일 노담 출첵 ✅</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={onClick}>
            오늘도 #노담 🚭
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AttendModal.propTypes = {
  startsAt: PropTypes.instanceOf(Date).isRequired,
  noAttend: PropTypes.bool.isRequired,
};

export default AttendModal;
