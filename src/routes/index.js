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
import Campaign from "routes/Campaign";
import CreateCampaign from "routes/CreateCampaign";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/campaign/create" element={<CreateCampaign />} />
          </>
        ) : (
          <>
            <Route path="/" exact element={<Auth />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
