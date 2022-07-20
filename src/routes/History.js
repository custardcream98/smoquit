import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HistoricalCampaignCard from "components/HistoricalCampaignCard";
import styles from "./History.module.css";
import { ATTEND_INTERVAL } from "core";

const History = () => {
  const campaignsStore = useSelector((state) => state.campaigns);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(
      campaignsStore
        .map((campaign) => ({
          duration:
            campaign.endsAt === 0
              ? ATTEND_INTERVAL > Date.now() - campaign.lastAttend
                ? campaign.duration + (Date.now() - campaign.lastAttend)
                : campaign.duration + ATTEND_INTERVAL
              : campaign.duration,
          ...campaign,
        }))
        .sort((a, b) => b.duration - a.duration)
        .map((campaign, index) => ({
          rank: index + 1,
          ...campaign,
        }))
        .sort((a, b) => b.startsAt - a.startsAt)
    );
  }, [campaignsStore]);

  const onOrderbyTimeClick = () =>
    setCampaigns((priv) => [...priv.sort((a, b) => b.startsAt - a.startsAt)]);

  const onOrderbyDurationClick = () =>
    setCampaigns((priv) => [...priv.sort((a, b) => b.duration - a.duration)]);

  return (
    <>
      <div className="d-flex flex-row justify-content-end">
        <ButtonGroup>
          <Button
            variant="primary"
            className={`pb-1 pt-1 mb-1 ${styles.Btn}`}
            onClick={onOrderbyTimeClick}
          >
            최신순
          </Button>
          <Button
            variant="primary"
            className={`pb-1 pt-1 mb-1 ${styles.Btn}`}
            onClick={onOrderbyDurationClick}
          >
            기록순
          </Button>
        </ButtonGroup>
      </div>

      {campaigns.length !== 0 ? (
        campaigns.map((campaign) => (
          <HistoricalCampaignCard key={campaign.startsAt} campaign={campaign} />
        ))
      ) : (
        <h3 className="mt-4">아직 도전하지 않았네요!</h3>
      )}
    </>
  );
};

export default History;
