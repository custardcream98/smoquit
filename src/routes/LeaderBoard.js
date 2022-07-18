import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  collectionGroup,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";

const LeaderBoard = () => {
  // // 전체 데이터 가져와서 front에서 계산해야 함
  // // firestore에서는 여러 필드에 대해 쿼리를 날릴 수 없음

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [orderByDuration, setOrderByDuration] = useState([]);
  const [orderByStartsAt, setOrderByStartsAt] = useState([]);

  const qOrderByStartsAt = query(
    query(collectionGroup(fireStore, DOC_CAMPAIGNS), where("endsAt", "==", 0)),
    orderBy("startsAt"),
    limit(20)
  );

  const qOrderByDuration = query(
    query(collectionGroup(fireStore, DOC_CAMPAIGNS), where("endsAt", "!=", 0)),
    orderBy("endsAt"),
    orderBy("duration"),
    limit(20)
  );

  // const onGoingQ = query(
  //   collectionGroup(fireStore, DOC_CAMPAIGNS),
  //   where("endsAt", "==", 0),
  //   orderBy("startsAt"),
  //   limit(20)
  // );

  useEffect(() => {
    onSnapshot(qOrderByStartsAt, (snapshot) => {
      let leaderboardDataSnapshot = [];
      snapshot.forEach((doc) =>
        leaderboardDataSnapshot.push({
          uid: doc.id,
          startsAt: doc.data().startsAt,
          endsAt: doc.data().endsAt,
          duration: doc.data().duration,
        })
      );
      setOrderByStartsAt((priv) => leaderboardDataSnapshot);
    });

    onSnapshot(qOrderByDuration, (snapshot) => {
      let leaderboardDataSnapshot = [];
      snapshot.forEach((doc) =>
        leaderboardDataSnapshot.push({
          uid: doc.id,
          startsAt: doc.data().startsAt,
          endsAt: doc.data().endsAt,
          duration: doc.data().duration,
        })
      );
      setOrderByDuration((priv) => leaderboardDataSnapshot);
    });
  }, []);

  // useEffect(() => {}, [leaderboardData]);

  useEffect(() => {
    const now = Date.now();
    console.log(orderByStartsAt);
    let campaignData = orderByStartsAt.map((campaign) => ({
      duration: now - campaign.startsAt,
      ...campaign,
    }));

    console.log(campaignData);
  }, [orderByDuration, orderByStartsAt]);
  return <div>개발중입니다</div>;
};

export default LeaderBoard;
