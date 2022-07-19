import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Card, Badge, ListGroup } from "react-bootstrap";
import timeDelta2str from "core/timeDelta2str";
import * as constants from "core/constants";
import CampaignGiveupModal from "components/CampaignGiveupModal";
import styles from "./CampaignCard.module.css";

const CampaignCard = ({ name, attempCount, startsAt }) => {
  const [timer, setTimer] = useState(Date.now() - startsAt);
  const [cigNum, setCigNum] = useState(0);

  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const countUp = setInterval(() => {
      setTimer(Date.now() - startsAt);
    }, 1000);

    setCigNum(timer / (86400000 / profile.cigPerDay));

    return () => clearInterval(countUp);
  }, [timer]);

  return (
    <>
      <div className="justify-content-start d-flex align-items-center mb-2">
        <span className={styles.CampaignTitle}>{name}</span>
        <span className="ps-2">
          <Badge
            bg="primary"
            pill
            className="d-flex align-items-center justify-content-between"
          >
            진행중
            <Badge
              bg="light"
              className={`${styles.AttempCount} text-primary ms-1`}
            >{`${attempCount}번째 도전`}</Badge>
          </Badge>
        </span>
      </div>
      <Card>
        <Card.Body>
          <Card.Title as="h1">{timeDelta2str(timer)}</Card.Title>
          <Card.Text>동안 {profile.displayName}님은👇</Card.Text>
        </Card.Body>
      </Card>
      <ListGroup className="mt-1">
        <ListGroup.Item>
          🚭 <mark>{cigNum.toFixed(2)}개피의 담배</mark>를 참았고
        </ListGroup.Item>
        <ListGroup.Item>
          ⏱️ <mark>{timeDelta2str(cigNum * constants.TIME_PER_CIG)}</mark>를
          아꼈고
        </ListGroup.Item>
        <ListGroup.Item>
          💵{" "}
          <mark>
            {(
              cigNum * constants.COST_PER_CIG +
              cigNum * constants.TIME_PER_CIG * constants.COST_PER_CIGTIME
            ).toFixed(2)}
            원
          </mark>
          을 벌었고
        </ListGroup.Item>
        <ListGroup.Item>
          😁 <mark>{timeDelta2str(cigNum * constants.LIFESPAN_PER_CIG)}</mark>
          만큼 더 살 수 있게 됐어요
        </ListGroup.Item>
      </ListGroup>
      <CampaignGiveupModal startsAt={startsAt} />
    </>
  );
};

CampaignCard.propTypes = {
  name: PropTypes.string.isRequired,
  attempCount: PropTypes.number.isRequired,
  startsAt: PropTypes.instanceOf(Date).isRequired,
};

export default CampaignCard;
