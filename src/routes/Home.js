import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { fireStore, fireAuth } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";
import CampaignCard from "components/CampaignCard";
import CampaignHistory from "components/CampaignHistory";
import { setCampaigns as setCampaignsStore } from "store/actions/campaignsAction";

const Home = () => {
  const profile = useSelector((state) => state.profile);
  const [campaigns, setCampaigns] = useState([]);
  const dispatch = useDispatch();

  const loadCampaigns = async () => {
    onSnapshot(
      collection(
        fireStore,
        DOC_CAMPAIGNS_BY_USER,
        fireAuth.currentUser.uid,
        DOC_CAMPAIGNS
      ),
      (snapshot) => {
        const campaignsArr = [];
        snapshot.forEach((doc) => campaignsArr.push(doc));
        campaignsArr.sort((a, b) => b.data().startsAt - a.data().startsAt);
        setCampaigns(campaignsArr);
        const campaignsDocArr = [];
        campaignsArr.forEach((doc) => campaignsDocArr.push(doc.data()));
        dispatch(setCampaignsStore({ campaigns: campaignsDocArr }));
      }
    );
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

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
