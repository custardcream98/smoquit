import React, { useSelector } from "react-redux";
import Campaign from "routes/Campaign";

const Home = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div>
      <h1>어서오세요 {profile.displayName}님,</h1>
      <Campaign />
    </div>
  );
};

export default Home;
