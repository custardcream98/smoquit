import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  query,
  where,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS } from "firebaseSetup/docNames";

const CampaignCard = ({ name, startsAt }) => {
  const profile = useSelector((state) => state.profile);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const countUp = setInterval(() => {
      setTimer((priv) => Date.now() - startsAt);
    }, 1000);

    return () => clearInterval(countUp);
  }, [timer]);

  const date2str = (date) =>
    `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDay()}일 ${date.getHours()}:${date.getMinutes()}`;
  const timeDelta2str = (delta) => {
    const year = Math.floor(delta / 31536000000);
    delta %= 31536000000;
    const month = Math.floor(delta / 2592000000);
    delta %= 2592000000;
    const day = Math.floor(delta / 86400000);
    delta %= 86400000;
    const hour = Math.floor(delta / 3600000);
    delta %= 3600000;
    const minute = Math.floor(delta / 60000);
    delta %= 60000;
    const secound = Math.floor(delta / 1000);

    return `${year ? year + "년 " : ""}${month ? month + "개월 " : ""}${
      day ? day + "일 " : ""
    }${hour ? hour + "시간 " : ""}${minute ? minute + "분 " : ""}${secound}초`;
  };

  const onClick = async () => {
    const docPeriodRef = collection(fireStore, DOC_CAMPAIGNS);
    const q = query(docPeriodRef, where("uid", "==", profile.uid));
    const querySnapshot = await getDocs(q);
    let userCampaignRef = null;
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      if (
        doc.data().name === name &&
        doc.data().startsAt === startsAt.getTime()
      ) {
        userCampaignRef = doc.ref;
      }
    });

    await updateDoc(userCampaignRef, {
      endsAt: Date.now(),
    });
  };

  return (
    <div>
      <h4>{name}</h4>
      <span>{date2str(startsAt) + " 부터"}</span>
      <h1>{timeDelta2str(timer)}만큼 #노담 이였어요</h1>
      <h3></h3>
      <button onClick={onClick}>포기하기</button>
    </div>
  );
};

CampaignCard.propTypes = {
  name: PropTypes.string.isRequired,
  startsAt: PropTypes.instanceOf(Date).isRequired,
};

export default CampaignCard;
