import React, { useEffect, useState } from "react";
import { fireAuth } from "firebaseSetup";
import { Card, Badge } from "react-bootstrap";
import { ATTEND_INTERVAL, date2str, timeDelta2str } from "core";
import styles from "./LeaderBoardCard.module.css";

const LeaderBoardCard = ({ campaign, rank }) => {
  const isOnGoing = campaign.endsAt === 0;
  const isPending = Date.now() - campaign.lastAttend > ATTEND_INTERVAL;

  const [timer, setTimer] = useState(
    !isPending
      ? campaign.duration + Date.now() - campaign.lastAttend
      : campaign.duration + ATTEND_INTERVAL
  );

  useEffect(() => {
    let countUp;
    if (isOnGoing && !isPending) {
      countUp = setInterval(() => {
        setTimer(campaign.duration + Date.now() - campaign.lastAttend);
      }, 1000);
    }

    return () => clearInterval(countUp);
  }, [timer]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className={`mb-1 ${styles.ItemTitle}`}>
          <strong>{campaign.userName}</strong>
          {rank <= 3 ? (
            <Badge bg="warning" className="ms-2">
              {rank}위
            </Badge>
          ) : null}

          <Badge
            bg={isOnGoing && !isPending ? "success" : "danger"}
            className="ms-2"
          >
            {isOnGoing ? (!isPending ? "도전중" : "출첵 필요") : "포기"}
          </Badge>

          {campaign.uid === fireAuth.currentUser.uid ? (
            <Badge bg="primary" className="ms-2">
              내 기록
            </Badge>
          ) : null}
        </Card.Title>
        <Card.Text className={`${styles.ItemTime}`}>
          {date2str(new Date(campaign.startsAt))} →{" "}
          {isOnGoing ? null : date2str(new Date(campaign.endsAt)) + " 까지"}
        </Card.Text>
        <Card.Text className="mt-2">
          {isOnGoing ? timeDelta2str(timer) : timeDelta2str(campaign.duration)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LeaderBoardCard;
