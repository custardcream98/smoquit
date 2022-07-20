import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { ATTEND_INTERVAL, date2str, timeDelta2str } from "core";
import styles from "./HistoricalCampaignCard.module.css";

const HistoricalCampaignCard = ({ campaign }) => {
  const isOnGoing = campaign.endsAt == 0;
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
          {campaign.name}
          <Badge
            bg={isOnGoing && !isPending ? "success" : "danger"}
            className="ms-2"
          >
            {isOnGoing ? (!isPending ? "도전중" : "출첵 필요") : "포기"}
          </Badge>
          {campaign.rank === 1 ? (
            <Badge bg="primary" className="ms-2">
              최고기록
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

export default HistoricalCampaignCard;
