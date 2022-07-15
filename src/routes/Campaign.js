import React, { useSelector, useEffect, useState } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from "firebaseSetup";
import { DOC_QUITTED_PERIOD } from "firebaseSetup/docNames";
import CampaignCard from "components/CampaignCard";

const Campaign = () => {
  const profile = useSelector((state) => state.profile);
  const [campaigns, setCampaigns] = useState([]);

  // await addDoc(collection(fireStore, DOC_QUITTED_PERIOD), {
  //   userId: createdUser.user.uid,
  //   campaigns:[{name: "내 첫 금연", }]
  //   startsAt: Date.now(),
  //   endsAt: 0,
  // });

  const loadQuittedPeriodDocs = async () => {
    const quittedRef = collection(fireStore, DOC_QUITTED_PERIOD);
    const q = query(quittedRef, where("uid", "==", profile.uid));
    const querySnapshot = await getDocs(q);
    const userCampaign = querySnapshot.docs[0];
    let campaignsArr = userCampaign.data().campaigns.map((campaign) => ({
      id: `${profile.uid}${campaign.startsAt}`,
      startsAt: new Date(campaign.startsAt),
      endsAt: new Date(campaign.endsAt),
    }));
    campaignsArr.sort((a, b) => b.startsAt.getTime() - a.startsAt.getTime());
    setCampaigns(campaignsArr);
  };

  useEffect(() => {
    loadQuittedPeriodDocs();
  }, []);

  return (
    <div>
      {campaigns.length === 0 ? (
        <h3>금연 시작해보는게 어때요?</h3>
      ) : (
        <h3>
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              name={campaign.name}
              startsAt={campaign.startsAt}
              endsAt={campaign.endsAt}
            />
          ))}
        </h3>
      )}
    </div>
  );
};

export default Campaign;
