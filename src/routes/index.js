import React from "react";
import PropTypes from "prop-types";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import CreateCampaign from "routes/CreateCampaign";
import LeaderBoard from "routes/LeaderBoard";
import History from "routes/History";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <div className="ms-3 me-3 mt-2 mb-3">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/history" element={<History />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Auth />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
