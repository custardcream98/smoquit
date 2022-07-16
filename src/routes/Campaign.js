import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS } from "firebaseSetup/docNames";
import CampaignCard from "components/CampaignCard";

const Campaign = () => {
  const profile = useSelector((state) => state.profile);
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    const campaignsRef = collection(fireStore, DOC_CAMPAIGNS);
    const q = query(campaignsRef, where("uid", "==", profile.uid));

    onSnapshot(q, (querySnapshot) => {
      const campaignsArr = [];
      querySnapshot.forEach((doc) => {
        campaignsArr.push(doc.data());
      });
      campaignsArr.sort((a, b) => b.startsAt - a.startsAt);
      setCampaigns(campaignsArr);
    });
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const createCampaignBtn = (
    <>
      <h3>금연 시작해보는게 어때요?</h3>
      <Link to="/campaign/create">#노담 시작하기</Link>
    </>
  );

  return (
    <div>
      {campaigns.length !== 0 ? (
        campaigns[0].endsAt === 0 ? (
          <h3>
            {
              <CampaignCard
                key={`${campaigns[0].uid}${campaigns[0].startsAt}`}
                name={campaigns[0].name}
                startsAt={new Date(campaigns[0].startsAt)}
              />
            }
          </h3>
        ) : (
          createCampaignBtn
        )
      ) : (
        createCampaignBtn
      )}
    </div>
  );
};

export default Campaign;
