import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";

const CampaignGiveupModal = ({ startsAt }) => {
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

    const now = Date.now();

    await updateDoc(campaignDocRef, {
      endsAt: now,
      duration: now - startsAt,
    });
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleShow}
        className="mt-3"
      >
        포기하기
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>정말 포기할거에요? 😢</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          흡연 욕구가 시작되는 <strong>첫 5분</strong>을 잘 이겨내면 금연에
          성공할 확률이 크게 높아져요. 우리 조금만 더 버텨봐요!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            참자 참아!!!
          </Button>
          <Button variant="outline-danger" onClick={onClick}>
            못하겠어요...
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CampaignGiveupModal.propTypes = {
  startsAt: PropTypes.instanceOf(Date).isRequired,
};

export default CampaignGiveupModal;
