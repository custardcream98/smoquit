import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Button } from "react-bootstrap";
import HistoricalCampaignCard from "components/HistoricalCampaignCard";
import styles from "./History.module.css";

const History = () => {
  const campaignsStore = useSelector((state) => state.campaigns);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(
      campaignsStore
        .map((campaign) => ({
          duration:
            campaign.endsAt === 0
              ? Date.now() - campaign.startsAt
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

      {campaigns.map((campaign) => (
        <HistoricalCampaignCard key={campaign.startsAt} campaign={campaign} />
      ))}
    </>
  );
};

export default History;
