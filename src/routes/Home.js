import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";
import CampaignCard from "components/CampaignCard";
import CampaignHistory from "components/CampaignHistory";
import style from "./Home.module.css";

const Home = () => {
  const profile = useSelector((state) => state.profile);
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    onSnapshot(
      collection(fireStore, DOC_CAMPAIGNS_BY_USER, profile.uid, DOC_CAMPAIGNS),
      (snapshot) => {
        const campaignsArr = [];
        snapshot.forEach((doc) => campaignsArr.push(doc));
        campaignsArr.sort((a, b) => b.data().startsAt - a.data().startsAt);
        setCampaigns(campaignsArr);
      }
    );
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const createCampaignBtn = (sayHello) => (
    <>
      <p className={`h5 ${style.Home__Usertitle}`}>
        어서오세요 {profile.displayName}님 👋
      </p>
      <h3>금연 {sayHello ? "시작해보는게 어때요?" : "다시 도전해봐요!"}</h3>
      <Button as={Link} to="/create" variant="primary">
        <span>#노담 시작하기</span>
      </Button>
    </>
  );

  return (
    <div>
      {campaigns.length !== 0 ? (
        campaigns[0].data().endsAt === 0 ? (
          <CampaignCard
            key={campaigns[0].id}
            name={campaigns[0].data().name}
            attempCount={campaigns.length + 1}
            startsAt={new Date(campaigns[0].data().startsAt)}
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
