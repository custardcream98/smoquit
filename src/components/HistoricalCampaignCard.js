import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { date2str, timeDelta2str } from "core";
import styles from "./HistoricalCampaignCard.module.css";

const HistoricalCampaignCard = ({ campaign }) => {
  const [timer, setTimer] = useState(Date.now() - campaign.startsAt);

  const isOnGoing = campaign.endsAt == 0;
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
          {campaign.name}
          {isOnGoing ? (
            <Badge bg="success" className="ms-2">
              도전중
            </Badge>
          ) : null}
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
