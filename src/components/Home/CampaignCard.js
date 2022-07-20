import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Card, Badge, ListGroup } from "react-bootstrap";
import timeDelta2str from "core/timeDelta2str";
import * as constants from "core/constants";
import CampaignGiveupModal from "components/Home/CampaignGiveupModal";
import AttendModal from "components/Home/AttendModal";
import styles from "styles/CampaignCard.module.css";

const CampaignCard = ({
  name,
  attempCount,
  startsAt,
  lastAttend,
  duration,
}) => {
  const profile = useSelector((state) => state.profile);
  const [timer, setTimer] = useState(
    Date.now() - lastAttend < constants.ATTEND_INTERVAL
      ? duration + Date.now() - lastAttend
      : duration + constants.ATTEND_INTERVAL
  );
  const [leftAttendTime, setLeftAttendTime] = useState(
    constants.ATTEND_INTERVAL - (Date.now() - lastAttend)
  );
  const [cigNum, setCigNum] = useState(
    (Date.now() - lastAttend < constants.ATTEND_INTERVAL
      ? duration + Date.now() - lastAttend
      : duration + constants.ATTEND_INTERVAL) /
      (86400000 / profile.cigPerDay)
  );
  const [noAttend, setNoAttend] = useState(false);

  useEffect(() => {
    if (leftAttendTime > 0) {
      const countUp = setInterval(() => {
        setTimer(duration + Date.now() - lastAttend);
      }, 1000);

      setCigNum(
        (duration + (Date.now() - lastAttend)) / (86400000 / profile.cigPerDay)
      );
      setLeftAttendTime(constants.ATTEND_INTERVAL - (Date.now() - lastAttend));
      setNoAttend(false);

      return () => clearInterval(countUp);
    } else {
      setNoAttend(true);
    }
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
            {!noAttend ? "진행중" : "출석 필요"}
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
      <div className="d-flex justify-content-between">
        <CampaignGiveupModal
          startsAt={startsAt}
          lastAttend={lastAttend}
          leftAttendTime={leftAttendTime}
          duration={duration}
        />
        <AttendModal
          startsAt={startsAt}
          noAttend={noAttend}
          lastAttend={lastAttend}
          leftAttendTime={leftAttendTime}
          duration={duration}
          setLeftAttendTime={setLeftAttendTime}
          setTimer={setTimer}
        />
      </div>
    </>
  );
};

CampaignCard.propTypes = {
  name: PropTypes.string.isRequired,
  attempCount: PropTypes.number.isRequired,
  startsAt: PropTypes.instanceOf(Date).isRequired,
  lastAttend: PropTypes.instanceOf(Date).isRequired,
};

export default CampaignCard;
