import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  orderBy,
  collectionGroup,
  limit,
  where,
} from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS } from "firebaseSetup/docNames";
import LeaderBoardCard from "components/LeaderBoardCard";

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

  useEffect(() => {
    onSnapshot(qOrderByStartsAt, (snapshot) => {
      let leaderboardDataSnapshot = [];
      snapshot.forEach((doc) => leaderboardDataSnapshot.push(doc.data()));
      setOrderByStartsAt((priv) => leaderboardDataSnapshot);
    });

    onSnapshot(qOrderByDuration, (snapshot) => {
      let leaderboardDataSnapshot = [];
      snapshot.forEach((doc) => leaderboardDataSnapshot.push(doc.data()));
      setOrderByDuration((priv) => leaderboardDataSnapshot);
    });
  }, []);

  useEffect(() => {
    const now = Date.now();
    let campaignData = orderByStartsAt
      .map((campaign) => {
        let campaignNew = campaign;
        campaignNew["duration"] = now - campaign.startsAt;
        return campaignNew;
      })
      .concat(orderByDuration);

    setLeaderboardData((priv) =>
      campaignData.sort((a, b) => b.duration - a.duration)
    );
  }, [orderByDuration, orderByStartsAt]);

  return (
    <div>
      {leaderboardData.map((campaign, index) => (
        <LeaderBoardCard
          key={`${campaign.uid}${campaign.startsAt}`}
          campaign={campaign}
          rank={index + 1}
        />
      ))}
    </div>
  );
};

export default LeaderBoard;
