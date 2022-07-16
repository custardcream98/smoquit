import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { Button, Card, Badge, ListGroup } from "react-bootstrap";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";
import timeDelta2str from "core/timeDelta2Str";
import styles from "./CampaignCard.module.css";

const CampaignCard = ({ name, startsAt }) => {
  const [timer, setTimer] = useState(0);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const countUp = setInterval(() => {
      setTimer((priv) => Date.now() - startsAt);
    }, 1000);

    return () => clearInterval(countUp);
  }, [timer]);

  const date2str = (date) =>
    `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;

  const onClick = async () => {
    const campaignDocRef = doc(
      fireStore,
      DOC_CAMPAIGNS_BY_USER,
      profile.uid,
      DOC_CAMPAIGNS,
      `${startsAt.getTime()}`
    );
    // const q = query(docPeriodRef, where("uid", "==", profile.uid));
    // const querySnapshot = await getDocs(q);
    // let userCampaignRef = null;
    // console.log(querySnapshot);

    // querySnapshot.forEach((doc) => {
    //   if (
    //     doc.data().name === name &&
    //     doc.data().startsAt === startsAt.getTime()
    //   ) {
    //     userCampaignRef = doc.ref;
    //   }
    // });

    await updateDoc(campaignDocRef, {
      endsAt: Date.now(),
    });
  };

  const howManyCig = (delta) => {};

  return (
    <div>
      <Card>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Subtitle as="h6" className={styles.Subtitle}>
            {date2str(startsAt) + " 부터"}
          </Card.Subtitle>
          <Card.Title as="h2">
            <Badge bg="dark">{timeDelta2str(timer)}</Badge>
          </Card.Title>
          <Card.Text>동안 {profile.displayName}님은...</Card.Text>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Card>
      <Button onClick={onClick} variant="outline-danger" size="sm">
        포기하기
      </Button>
    </div>
  );
};

CampaignCard.propTypes = {
  name: PropTypes.string.isRequired,
  startsAt: PropTypes.instanceOf(Date).isRequired,
};

export default CampaignCard;
