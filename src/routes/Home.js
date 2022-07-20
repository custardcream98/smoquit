import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CampaignCard from "components/CampaignCard";
import CampaignHistory from "components/CampaignHistory";

const Home = () => {
  const profile = useSelector((state) => state.profile);
  const campaigns = useSelector((state) => state.campaigns);

  const createCampaignBtn = (sayHello) => (
    <>
      <p className="h5 mt-5 mb-2">어서오세요 {profile.displayName}님 👋</p>
      <h1 className="mb-3">
        금연 {sayHello ? "시작해보는게 어때요?" : "다시 도전해봐요!"}
      </h1>
      <Button as={Link} to="/create" variant="primary" className="mb-4">
        <span>#노담 시작하기</span>
      </Button>
    </>
  );

  return (
    <div>
      {campaigns?.length ? (
        campaigns[0].endsAt === 0 ? (
          <CampaignCard
            key={campaigns[0].startsAt}
            name={campaigns[0].name}
            attempCount={campaigns.length + 1}
            startsAt={new Date(campaigns[0].startsAt)}
            lastAttend={new Date(campaigns[0].lastAttend)}
            duration={campaigns[0].duration}
          />
        ) : (
          <>
            {createCampaignBtn(false)}
            <CampaignHistory campaigns={campaigns} />
          </>
        )
      ) : (
        createCampaignBtn(true)
      )}
    </div>
  );
};

export default Home;
