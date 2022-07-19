import React, { useEffect, useState } from "react";
import { fireAuth } from "firebaseSetup";
import { Card, Badge } from "react-bootstrap";
import { date2str, timeDelta2str } from "core";
import styles from "./LeaderBoardCard.module.css";

const LeaderBoardCard = ({ campaign, rank }) => {
  const [timer, setTimer] = useState(Date.now() - campaign.startsAt);

  const isOnGoing = campaign.endsAt === 0;
  useEffect(() => {
    let countUp;
    if (isOnGoing) {
      countUp = setInterval(() => {
        setTimer(Date.now() - campaign.startsAt);
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
          {isOnGoing ? (
            <Badge bg="success" className="ms-2">
              도전중
            </Badge>
          ) : null}
          {campaign.uid === fireAuth.currentUser.uid ? (
            <Badge bg="success" className="ms-2">
              내 기록
            </Badge>
          ) : null}
        </Card.Title>
        <Card.Text className={`${styles.ItemTime}`}>
          {date2str(new Date(campaign.startsAt))} →{" "}
          {isOnGoing ? null : date2str(new Date(campaign.endsAt)) + " 까지"}
        </Card.Text>
        <Card.Text className="mt-2">
          {isOnGoing
            ? timeDelta2str(new Date(timer))
            : timeDelta2str(new Date(campaign.duration))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LeaderBoardCard;
