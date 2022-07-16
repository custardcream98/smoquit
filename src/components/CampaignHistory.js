import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Badge, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import timeDelta2str from "core/timeDelta2Str";
import style from "./CampaignHistory.module.css";

const CampaignHistory = ({ campaigns }) => {
  const [aggTime, setAggTime] = useState(0);
  const [aggCigTime, setAggCigTime] = useState(0);
  const [aggMoney, setAggMoney] = useState(0.0);
  const [aggCig, setAggCig] = useState(0.0);
  const [lifespan, setLifespan] = useState(0.0);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    let timeSum = 0;
    campaigns.forEach((campaign) => {
      const { startsAt, endsAt } = campaign.data();
      timeSum += endsAt - startsAt;
    });
    setAggTime(timeSum);
  }, []);

  useEffect(() => {
    calCig(aggTime);
  }, [aggTime]);

  useEffect(() => {
    calCigTime(aggCig);
    calLifespan(aggCig);
  }, [aggCig]);

  useEffect(() => {
    calMoney(aggCig, aggCigTime);
  }, [aggCigTime]);

  const calCig = (timeSum) => {
    const cigInterval = 86400000 / profile.cigPerDay;
    const caledAggCig = (timeSum / cigInterval).toFixed(2);
    setAggCig(caledAggCig);
  };

  // 한 개피당 평균 15분 소요 (이동시간 고려)
  const calCigTime = (cigNum) => setAggCigTime(900000 * cigNum);

  // 담배 안피운 개피 수 가치 + 흡연 시간만큼의 최저시급
  const calMoney = (cigNum, cigTime) =>
    setAggMoney((225 * cigNum + 0.00254444 * cigTime).toFixed(2));

  // 한 개피당 5분의 수명단축
  const calLifespan = (cigNum) => setLifespan(300000 * cigNum);

  return (
    <Card className={style.CampaignHistory}>
      <Card.Body>
        <Card.Text>
          <strong>{campaigns.length}번</strong>의 시도,
        </Card.Text>
        <Card.Text>총 {timeDelta2str(aggTime)},</Card.Text>
        <Card.Text>그동안 {profile.displayName}님은...</Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>
          🚭 <mark>{aggCig}개피의 담배</mark>를 참았고
        </ListGroup.Item>
        <ListGroup.Item>
          ⏱️ <mark>{timeDelta2str(aggCigTime)}</mark>를 벌었고
        </ListGroup.Item>
        <ListGroup.Item>
          💵 <mark>{aggMoney}원</mark>을 아꼈고
        </ListGroup.Item>
        <ListGroup.Item>
          😁 <mark>{timeDelta2str(lifespan)}</mark>만큼 더 살 수 있게 됐어요
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

CampaignHistory.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CampaignHistory;
